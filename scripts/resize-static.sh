#!/bin/bash

# Check if ImageMagick is installed (prefer IM v7 `magick` over deprecated `convert`)
CONVERT_BIN=""
if command -v magick >/dev/null 2>&1; then
    CONVERT_BIN="magick"
elif command -v convert >/dev/null 2>&1; then
    CONVERT_BIN="convert"
else
    echo "Error: ImageMagick is not installed. Please install it first:"
    echo "  macOS:           brew install imagemagick"
    echo "  Debian/Ubuntu:   sudo apt install imagemagick"
    echo "  Arch/Manjaro:    sudo pacman -S imagemagick"
    exit 1
fi

# Set the directories
IMAGES_DIR="images"
STATIC_DIR="static"

# Create static directory if it doesn't exist
if [ ! -d "$STATIC_DIR" ]; then
    echo "Creating static directory..."
    mkdir -p "$STATIC_DIR"
fi

# Check if images directory exists
if [ ! -d "$IMAGES_DIR" ]; then
    echo "Error: Images directory not found!"
    exit 1
fi

echo "Starting image processing from $IMAGES_DIR to $STATIC_DIR..."

# Process images and SVGs
find "$IMAGES_DIR" -type f \( \
    -iname '*.jpg' -o \
    -iname '*.jpeg' -o \
    -iname '*.png' -o \
    -iname '*.gif' -o \
    -iname '*.webp' -o \
    -iname '*.svg' \
    \) -print0 | while IFS= read -r -d '' file; do
    
    # Get relative path from images directory
    relative_path="${file#$IMAGES_DIR/}"
    directory=$(dirname "$relative_path")
    filename=$(basename "$file")
    extension="${filename##*.}"
    filename_noext="${filename%.*}"
    
    # Create target directory structure
    target_dir="$STATIC_DIR/$directory"
    mkdir -p "$target_dir"
    
    echo "Processing: $file -> $target_dir/"
    
    # Handle SVG files (copy as-is)
    if [[ "${extension,,}" == "svg" ]]; then
        dest_path="$target_dir/$filename"
        if [[ -f "$dest_path" && "$dest_path" -nt "$file" ]]; then
            echo "  Up-to-date SVG, skipping: $filename"
        else
            cp "$file" "$dest_path"
            echo "  Copied SVG: $filename"
        fi
    else
        # Convert to WebP with transparency preservation
        dest_path="$target_dir/${filename_noext}.webp"
        if [[ -f "$dest_path" && "$dest_path" -nt "$file" ]]; then
            echo "  Up-to-date WebP, skipping: ${filename_noext}.webp"
        else
            "$CONVERT_BIN" "$file" \
                -resize "150x150>" \
                -strip \
                -define webp:lossless=true \
                -define webp:alpha-quality=100 \
                -define webp:method=6 \
                "$dest_path"
            echo "  Converted to WebP: ${filename_noext}.webp"
        fi
    fi
done

echo "Image processing complete!"