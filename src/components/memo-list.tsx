import {Memo, Reply} from "@/types";
import {MessageCircle, Pen, Trash2, X} from "lucide-react";
import {Button} from "./ui/button";
import Form from "./form";
import {useState} from "react";

type MemoListProps = {
  memos: Memo[];
  replys: Reply[];
  addReply: (content: string, parentId: number) => void;
  deleteMemo: (id: number) => void;
  deleteReply: (id: number) => void;
  updateMemo: (id: number, content: string) => void;
  updateReply: (id: number, content: string) => void;
  borderStyle?: boolean;
};

export default function MemoList({
  memos,
  replys,
  addReply,
  deleteMemo,
  deleteReply,
  updateMemo,
  updateReply,
  borderStyle,
}: MemoListProps) {
  const [onReplyIds, setOnReplyIds] = useState<number[]>([]);
  const [onEditMemoIds, setOnEditMemoIds] = useState<number[]>([]);
  const [onEditReplyIds, setOnEditReplyIds] = useState<number[]>([]);

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
              {!onEditMemoIds.includes(memo.id) && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-red-500 cursor-pointer"
                  onClick={() => deleteMemo(memo.id)}
                >
                  <Trash2 />
                  <span className="sr-only">Delete</span>
                </Button>
              )}
              <Button
                size="icon"
                variant="ghost"
                className="py-0 text-emerald-500 cursor-pointer"
                onClick={() => {
                  if (onEditMemoIds.includes(memo.id)) {
                    setOnEditMemoIds(
                      onEditMemoIds.filter((formId) => formId !== memo.id)
                    );
                  } else {
                    setOnEditMemoIds([...onEditMemoIds, memo.id]);
                  }
                }}
              >
                {onEditMemoIds.includes(memo.id) ? <X /> : <Pen />}
                <span className="sr-only">Edit</span>
              </Button>
            </p>
          </div>
          <div className="py-5 border-b">
            {onEditMemoIds.includes(memo.id) ? (
              <Form
                initialValue={memo.content}
                memoId={memo.id}
                updateMemo={updateMemo}
                onEditMemoIds={onEditMemoIds}
                setOnEditMemoIds={setOnEditMemoIds}
                borderStyle={borderStyle}
              />
            ) : (
              <>{memo.content}</>
            )}
          </div>
          {filterReplys(memo.id)?.map((reply) => (
            <div
              key={reply.id}
              className="w-[calc(100%-2.5rem)] ml-auto mt-5 rounded-md bg-muted pt-4 pb-5 px-5"
            >
              <div className="text-muted-foreground flex justify-between items-center">
                <p>{memo.timestamp}</p>
                <p className="flex items-center">
                  {!onEditReplyIds.includes(reply.id) && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-500 cursor-pointer hover:bg-white"
                      onClick={() => deleteReply(reply.id)}
                    >
                      <Trash2 />
                      <span className="sr-only">Delete</span>
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="py-0 text-emerald-500 cursor-pointer hover:bg-white"
                    onClick={() => {
                      if (onEditReplyIds.includes(reply.id)) {
                        const newOnEditReplyIds = onEditReplyIds.filter(
                          (formId) => formId !== reply.id
                        );
                        setOnEditReplyIds(newOnEditReplyIds);
                      } else {
                        setOnEditReplyIds([...onEditReplyIds, reply.id]);
                      }
                    }}
                  >
                    {onEditReplyIds.includes(reply.id) ? (
                      <>
                        <X />
                      </>
                    ) : (
                      <>
                        <Pen />
                      </>
                    )}
                    <span className="sr-only">Edit</span>
                  </Button>
                </p>
              </div>
              <div className="mt-5">
                {onEditReplyIds.includes(reply.id) ? (
                  <Form
                    initialValue={reply.content}
                    replyId={reply.id}
                    updateReply={updateReply}
                    onEditReplyIds={onEditReplyIds}
                    setOnEditReplyIds={setOnEditReplyIds}
                    borderStyle={borderStyle}
                  />
                ) : (
                  <>{reply.content}</>
                )}
              </div>
            </div>
          ))}
          <p className="mt-3">
            <Button
              size="icon"
              variant="ghost"
              className="text-emerald-500 cursor-pointer"
              onClick={() => {
                if (onReplyIds.includes(memo.id)) {
                  setOnReplyIds(
                    onReplyIds.filter((formId) => formId !== memo.id)
                  );
                } else {
                  setOnReplyIds([...onReplyIds, memo.id]);
                }
              }}
            >
              {onReplyIds.includes(memo.id) ? (
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
          {onReplyIds.includes(memo.id) && (
            <div className="my-4 ml-auto w-[calc(100%-2.5rem)]">
              <Form
                addReply={addReply}
                parentId={memo.id}
                onReplyIds={onReplyIds}
                placeholder="リプライを入力..."
                initialValue=""
                borderStyle={borderStyle}
              />
            </div>
          )}
        </div>
      ))}{" "}
    </div>
  );
}
