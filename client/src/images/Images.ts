import { error } from '../utils/messages'

interface ImageInfo {
    fileName: string
    fileType: string
    width: number
    height: number
}

interface ImageFormat {
    name: string
    image: HTMLImageElement
}

export class Images {

    private path: string = './img/'
    private images: Array<ImageFormat>

    constructor() {
        this.images = this.loadImages()
    }

    private loadImages() {
        const images: Array<ImageFormat> = []

        this.data.forEach(image => {
            const newImage: HTMLImageElement = new Image()
            newImage.src = this.path + image.fileName + '.' + image.fileType
            images.push({
                name: image.fileName,
                image: newImage
            } as ImageFormat)
        })
        console.log(images)
        return images
    }

    public getImage(name: string) {
        const image = this.images.find(image => image.name === name)?.image
        if (image === undefined) {
            throw new Error(error.noImageFound);
        }
        return image
    }

    private data: Array<ImageInfo> = [
        {
            fileName: 'player',
            fileType: 'png',
            width: 50,
            height: 50,
        }
    ]
}