package org.example.Angular.services;

import org.example.Angular.entities.Item;
import org.example.Angular.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@Service
public class ItemService {

    @Value("${upload.image.path}")
    private String UPLOAD_IMAGE_PATH;

    private final ItemRepository itemRepository;
    private final SubcategoryService subcategoryService;

    public ItemService(ItemRepository itemRepository, SubcategoryService subcategoryService) {
        this.itemRepository = itemRepository;
        this.subcategoryService = subcategoryService;
    }

    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    public Item getItem(int id) {
        Optional<Item> item = itemRepository.findById(id);

        return item.orElse(null);
    }

    public Item add(Item item, List<MultipartFile> images) {
        uploadImages(item, images);
        System.out.println(item.toString());
        itemRepository.save(item);

        subcategoryService.addItem(item);

        return item;
    }

    public Item update(Item item, Set<String> removeImages, List<MultipartFile> addImages) {
        Optional<Item> findItem = itemRepository.findById(item.getId());
        if (!findItem.isPresent())
            return item;

        if (removeImages != null) {
            removeImages.forEach(x -> {
                if (Files.exists(Paths.get(UPLOAD_IMAGE_PATH + x))) {
                    try {
                        Files.delete(Paths.get(UPLOAD_IMAGE_PATH + x));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                item.getImages().remove(x);
            });
        }

        uploadImages(item, addImages);

        if (item.getSubcategory() != findItem.get().getSubcategory()) {
            subcategoryService.removeItem(item.getSubcategory(), item);

            itemRepository.save(item);

            subcategoryService.addItem(item);

            return item;
        }

        return itemRepository.save(item);
    }

    public void delete(Item item) {
        if (item.getImages() != null) {
            for (String pair : item.getImages()) {
                if (Files.exists(Paths.get(UPLOAD_IMAGE_PATH + pair))) {
                    try {
                        Files.delete(Paths.get(UPLOAD_IMAGE_PATH + pair));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        subcategoryService.removeItem(item.getSubcategory(), item);
        itemRepository.delete(item);
    }

    private void uploadImages(Item item, List<MultipartFile> images) {
        if (images != null) {
            for (MultipartFile pair : images) {
                if (Objects.requireNonNull(pair.getOriginalFilename()).isEmpty())
                    continue;

                String fileName = java.util.UUID.randomUUID() + "_"
                        + StringUtils.cleanPath(Objects.requireNonNull(pair.getOriginalFilename()));

                try {
                    Path path = Paths.get(UPLOAD_IMAGE_PATH + fileName);
                    Files.copy(pair.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                    item.addImage(fileName);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public void addLook(int itemId, String ip) {
        Optional<Item> item = itemRepository.findById(itemId);
        if (item.isPresent()) {
            item.get().addLook(ip);
            itemRepository.save(item.get());
        }
    }
}
