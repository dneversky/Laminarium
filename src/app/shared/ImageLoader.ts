export class ImageLoader {

    loadImages: any = [];
    dataTransfer: DataTransfer = new DataTransfer();

    constructor() {}

    load(event, single: boolean = false) {

        let component = this;

        if (event.target.files && event.target.files[0]) {

            for(const file of event.target.files){

                let ext = file.name.match(/\.([^\.]+)$/)[1];

                switch (ext) {
                    case 'jpg':
                    case 'jpeg':
                    case 'png':
                        break;
                    default:
                        continue;
                }

                this.dataTransfer.items.add(file);

                let reader = new FileReader();

                reader.onload = function (e){
                    if(single)
                        component.loadImages[0] = e.target.result;
                    else
                        component.loadImages.push(e.target.result);
                }

                reader.readAsDataURL(file); // convert to base64 string
            }

            event.target.files = this.dataTransfer.files;
        }
    }

    removeImage(event){
        this.dataTransfer.items.remove(event.target);
        event.target.remove();
    }

    public removeImagesList: string[] = [];

    remImage(event, image){
        if(event.target.hasAttribute('remove')) {
            event.target.removeAttribute('remove');
            this.removeImagesList = this.removeImagesList.filter(x => x != image);
            event.target.style.opacity = '1';
        } else {
            event.target.setAttribute('remove', null);
            this.removeImagesList.push(image);
            event.target.style.opacity = '0.5';
        }
    }
}