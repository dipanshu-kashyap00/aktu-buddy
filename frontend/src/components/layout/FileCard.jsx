const FileCard = ({ file }) => (
  <picture>
    <source 
      media="(max-width: 640px)"
      srcSet={`${file.thumbnail}?w=300&h=200&fit=crop`}
    />
    <source 
      media="(min-width: 641px)"
      srcSet={`${file.thumbnail}?w=600&h=400&fit=crop`}
    />
    <img 
      src={file.thumbnail}
      alt={file.name}
      loading="lazy"
      className="w-full h-auto"
    />
  </picture>
);