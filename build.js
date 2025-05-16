const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Create images directory if it doesn't exist
if (!fs.existsSync("images")) {
  fs.mkdirSync("images");
}

// Read all markdown files from the posts directory
const postsDirectory = path.join(process.cwd(), "posts");
const filenames = fs.readdirSync(postsDirectory);

// Process each markdown file
const posts = filenames
  .filter((filename) => filename.endsWith(".md"))
  .map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      date: data.date,
      photo: data.photo,
      description: data.description || "",
      content: content,
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending

// Write the processed posts to a JSON file
fs.writeFileSync(
  path.join(process.cwd(), "posts.json"),
  JSON.stringify(posts, null, 2)
);
