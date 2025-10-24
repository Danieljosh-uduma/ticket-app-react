
type ImageProp = {
    src: string
    alt: string
    className?: string
    caption?: string
    onClick?: () => void
}

export function Image({src, alt, className, caption, onClick}: ImageProp) {
    return (
        <figure className={className} onClick={onClick}>
            <img src={src} alt={alt} className="w-full h-full object-fit" />
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    )
}