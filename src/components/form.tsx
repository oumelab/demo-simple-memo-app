import {Send} from "lucide-react";
import {Button} from "./ui/button";
import {Textarea} from "./ui/textarea";
import {useState} from "react";

type FormProps = {
  initialValue?: string;
  placeholder?: string;
  onSubmit: (content: string) => void;
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
          className="w-lg h-32 bg-white mb-4 border-0 shadow"
        />
        <Button
          onClick={() => {
            props.onSubmit(inputText);
            setInputText("");
          }}
          className="w-24 bg-emerald-600 text-white"
        >
          <Send />
        </Button>
    </div>
  );
}