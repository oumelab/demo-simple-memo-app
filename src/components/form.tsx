import {Send} from "lucide-react";
import {useState} from "react";
import {Button} from "./ui/button";
import {Textarea} from "./ui/textarea";
import clsx from "clsx";

type FormProps = {
  initialValue: string;
  placeholder: string;
  borderStyle?: boolean;
  addMemo?: (content: string) => void;
  addReply?: (content: string, parentId: number) => void;
  parentId?: number;
  replyForms?: number[];
};

export default function Form(props: FormProps) {
  const {initialValue = "", placeholder = ""} = props;
  const [inputText, setInputText] = useState(initialValue);

  return (
    <div>
      <Textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={placeholder}
        className={clsx("max-w-lg h-32 bg-white mb-4 border-0 shadow-lg", {
          "border": props.borderStyle,
        })}
      />
      {props.addReply && (
        <Button
          onClick={() => {
            props.addReply?.(inputText, props.parentId ?? 0);
            props.replyForms?.splice(
              props.replyForms.indexOf(props.parentId ?? 0),
              1
            );
            setInputText("");
          }}
          className="w-24 bg-emerald-600 text-white"
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
          className="w-24 bg-emerald-600 text-white"
        >
          <Send />
        </Button>
      )}
      {/* <Button
        onClick={() => {
          props.addMemo?.(inputText);
          setInputText("");
        }}
        className="w-24 bg-emerald-600 text-white"
      >
        <Send />
      </Button> */}
    </div>
  );
}
