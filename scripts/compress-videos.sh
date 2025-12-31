#!/bin/bash
# Video Compression Script for Kallax Landing Page
# Reduces video file sizes by ~80% while maintaining quality
# Generates both MP4 (compressed) and WebM versions

echo "🎬 Starting video compression..."
echo ""

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ Error: ffmpeg is not installed."
    echo "Install it with: brew install ffmpeg (macOS) or apt-get install ffmpeg (Linux)"
    exit 1
fi

echo "✓ ffmpeg found"
echo ""

# Create backup directory
mkdir -p images/original_videos
echo "✓ Created backup directory: images/original_videos"
echo ""

# Compress hero videos (target: 2-3MB each)
echo "📹 Compressing hero videos..."
for video in images/hero/*.mp4; do
    # Skip if already compressed
    if [[ "$video" == *"_compressed.mp4" ]]; then
        continue
    fi

    filename=$(basename "$video" .mp4)

    # Backup original if not already backed up
    if [ ! -f "images/original_videos/${filename}.mp4" ]; then
        cp "$video" "images/original_videos/${filename}.mp4"
        echo "  ✓ Backed up: ${filename}.mp4"
    fi

    echo "  ⏳ Compressing: ${filename}.mp4..."

    # Compress to MP4 (H.264, 720p, CRF 28)
    ffmpeg -i "$video" \
        -vf "scale=-2:720" \
        -c:v libx264 -preset slow -crf 28 \
        -movflags +faststart \
        -an \
        "images/hero/${filename}_compressed.mp4" \
        -y -loglevel error

    # Generate WebM version (VP9)
    echo "  ⏳ Generating WebM: ${filename}.webm..."
    ffmpeg -i "images/hero/${filename}_compressed.mp4" \
        -c:v libvpx-vp9 -crf 30 -b:v 0 \
        -an \
        "images/hero/${filename}.webm" \
        -y -loglevel error

    echo "  ✅ Completed: ${filename}"
    echo ""
done

# Compress phone mockup videos (target: 3-5MB each)
echo "📱 Compressing phone mockup videos..."
for video in images/screenshots/*.mp4; do
    # Skip if already compressed
    if [[ "$video" == *"_compressed.mp4" ]]; then
        continue
    fi

    filename=$(basename "$video" .mp4)

    # Backup original if not already backed up
    if [ ! -f "images/original_videos/${filename}.mp4" ]; then
        cp "$video" "images/original_videos/${filename}.mp4"
        echo "  ✓ Backed up: ${filename}.mp4"
    fi

    echo "  ⏳ Compressing: ${filename}.mp4..."

    # Compress to MP4 (H.264, 720p, CRF 26 - slightly higher quality)
    ffmpeg -i "$video" \
        -vf "scale=-2:720" \
        -c:v libx264 -preset slow -crf 26 \
        -movflags +faststart \
        -an \
        "images/screenshots/${filename}_compressed.mp4" \
        -y -loglevel error

    # Generate WebM version (VP9)
    echo "  ⏳ Generating WebM: ${filename}.webm..."
    ffmpeg -i "images/screenshots/${filename}_compressed.mp4" \
        -c:v libvpx-vp9 -crf 28 -b:v 0 \
        -an \
        "images/screenshots/${filename}.webm" \
        -y -loglevel error

    echo "  ✅ Completed: ${filename}"
    echo ""
done

echo "🎉 Video compression complete!"
echo ""
echo "Next steps:"
echo "1. Review the compressed videos to ensure quality is acceptable"
echo "2. Update index.html to use the new _compressed.mp4 and .webm versions"
echo "3. Test the page load time improvement"
echo ""
echo "Original videos backed up to: images/original_videos/"
