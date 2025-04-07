import {Send} from "lucide-react";
import {useState} from "react";
import {Button} from "./ui/button";
import {Textarea} from "./ui/textarea";
import clsx from "clsx";

type FormProps = {
  initialValue: string;
  placeholder?: string;
  borderStyle?: boolean;
  addMemo?: (content: string) => void;
  addReply?: (content: string, parentId: number) => void;
  updateMemo?: (id: number, content: string) => void;
  updateReply?: (id: number, content: string) => void;
  memoId?: number;
  replyId?: number;
  parentId?: number;
  onReplyIds?: number[];
  onEditMemoIds?: number[];
  onEditReplyIds?: number[];
  setOnEditMemoIds?: React.Dispatch<React.SetStateAction<number[]>>;
  setOnEditReplyIds?: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function Form(props: FormProps) {
  const {initialValue = "", placeholder = ""} = props;
  const [inputText, setInputText] = useState(initialValue);
  const buttonStyle = "w-24 bg-emerald-600 text-white cursor-pointer";

  return (
    <div>
      <Textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={placeholder}
        className={clsx("max-w-lg h-32 bg-white mb-4 border-0 shadow-lg", {
          border: props.borderStyle,
        })}
      />
      {props.addReply && (
        <Button
          onClick={() => {
            props.addReply?.(inputText, props.parentId ?? 0);
            props.onReplyIds?.splice(
              props.onReplyIds.indexOf(props.parentId ?? 0),
              1
            );
            setInputText("");
          }}
          className={buttonStyle}
        >
          <Send />
        </Button>
      )}
      {props.addMemo && (
        <Button
          onClick={() => {
            props.addMemo?.(inputText);
            setInputText("");
          }}
          className={buttonStyle}
        >
          <Send />
        </Button>
      )}
      {props.updateMemo && (
        <Button
          onClick={() => {
            props.updateMemo?.(props.memoId ?? 0, inputText);
            const newOnEditMemoIds =
              props.onEditMemoIds?.filter((id) => id !== props.memoId) ?? [];
            props.setOnEditMemoIds?.(newOnEditMemoIds);
            setInputText("");
          }}
          className={buttonStyle}
        >
          <Send />
        </Button>
      )}
      {props.updateReply && (
        <Button
        onClick={() => {
          props.updateReply?.(props.replyId ?? 0, inputText);
          const newOnEditReplyIds =
            props.onEditReplyIds?.filter((id) => id !== props.replyId) ?? [];
          props.setOnEditReplyIds?.(newOnEditReplyIds);
          setInputText("");
        }}
        className={buttonStyle}
        >
          <Send />
        </Button>
      )}
    </div>
  );
}
