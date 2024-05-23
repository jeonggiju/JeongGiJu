import "./css/TextElement.css";

interface ITextElement {
  date: string;
  content: string;
}

const TextElement = ({ date, content }: ITextElement) => {
  return (
    <div className="textElement">
      <div className="textElement_header">{date}</div>
      <div className="textElement_content">{content}</div>
    </div>
  );
};

export { TextElement };
