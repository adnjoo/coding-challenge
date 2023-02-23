import matter from 'gray-matter';
import { marked } from 'marked';

const DescriptionWithLinks = (description: string): { data: any; html: string } => {
  const { data, content } = matter(description);

  const html = marked(content);
  const regex = /\[(.*?)\]\((.*?)\)/gm;
  const replacedHtml = html.replace(
    regex,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return { data, html: replacedHtml };
};

export default DescriptionWithLinks;
