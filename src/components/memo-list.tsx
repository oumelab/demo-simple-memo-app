import { Memo, Reply } from "@/types";
import { MessageCircle, Pen, X } from "lucide-react";
import { useState } from "react";
import DeleteAlert from "./delete-alert";
import Form from "./form";
import ReplyList from "./reply-list";
import { Button } from "./ui/button";

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
                <DeleteAlert
                  mode="memo"
                  memoId={memo.id}
                  handleDeleteMemo={() => deleteMemo(memo.id)}
                 />
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
            <ReplyList
              key={reply.id}
              reply={reply}
              deleteReply={deleteReply}
              updateReply={updateReply}
              onEditReplyIds={onEditReplyIds}
              setOnEditReplyIds={setOnEditReplyIds}
            />
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