import {Memo, Reply} from "@/types";
import {MessageCircle, Pen, Trash2, X} from "lucide-react";
import {Button} from "./ui/button";
import Form from "./form";
import {useState} from "react";

export default function MemoList({
  memos,
  replys,
  addReply,
  deleteMemo,
  deleteReply,
}: {
  memos: Memo[];
  replys: Reply[];
  addReply: (content: string, parentId: number) => void;
  deleteMemo: (id: number) => void;
  deleteReply: (id: number) => void;
}) {
  const [replyForms, setReplyForms] = useState<number[]>([]);

  const filterReplys = (parentId: number) => {
    return replys.filter((reply) => reply.parentId === parentId);
  };

  return (
    <div className="max-w-2xl mt-12">
      {memos.map((memo) => (
        <div
          key={memo.id}
          className="bg-white rounded-lg border pt-4 pb-2 px-5 mb-8 shadow-sm"
        >
          <div className="text-muted-foreground flex justify-between items-center">
            <p>{memo.timestamp}</p>
            <p className="flex items-center">
              <Button
                size="icon"
                variant="ghost"
                className="py-0 text-emerald-500 cursor-pointer"
              >
                <Pen />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-red-500 cursor-pointer"
                onClick={() => deleteMemo(memo.id)}
              >
                <Trash2 />
                <span className="sr-only">Delete</span>
              </Button>
            </p>
          </div>
          <div className="py-5 border-b">{memo.content}</div>
          {filterReplys(memo.id)?.map((reply) => (
            <div
              key={reply.id}
              className="w-[calc(100%-2.5rem)] ml-auto mt-5 rounded-md bg-muted pt-4 pb-5 px-5"
            >
              <div className="text-muted-foreground flex justify-between items-center">
                <p>{memo.timestamp}</p>
                <p className="flex items-center">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="py-0 text-emerald-500 cursor-pointer hover:bg-white"
                  >
                    <Pen />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-red-500 cursor-pointer hover:bg-white"
                    onClick={() => deleteReply(reply.id)}
                  >
                    <Trash2 />
                    <span className="sr-only">Delete</span>
                  </Button>
                </p>
              </div>
              <div className="mt-5">{reply.content}</div>
            </div>
          ))}
          <p className="mt-3">
            <Button
              size="icon"
              variant="ghost"
              className="text-emerald-500 cursor-pointer"
              onClick={() => {
                if (replyForms.includes(memo.id)) {
                  setReplyForms(
                    replyForms.filter((formId) => formId !== memo.id)
                  );
                } else {
                  setReplyForms([...replyForms, memo.id]);
                }
              }}
            >
              {replyForms.includes(memo.id) ? (
                <>
                <X />
                <span className="sr-only">Cancel</span>
                </>
              ) : (
                <>
                <MessageCircle />
                <span className="sr-only">Reply</span>
                </>
              )}
            </Button>
          </p>
          {replyForms.includes(memo.id) && (
            <div className="my-4 ml-auto w-[calc(100%-2.5rem)]">
              <Form
                addReply={addReply}
                parentId={memo.id}
                replyForms={replyForms}
                placeholder="リプライを入力..."
                initialValue=""
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
