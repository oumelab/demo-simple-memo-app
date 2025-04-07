import Form from "./components/form";
import Layout from "./components/layout";
import MemoList from "./components/memo-list";
import {Memo, Reply} from "./types";
import {useState} from "react";

const initialMemo: Memo = {
  id: Date.now(),
  content:
    "思いついたことを、サッとメモ。\n作業に集中するための、シンプルなメモアプリです！",
  timestamp: new Date().toLocaleString("ja-JP"),
};

const initialReply: Reply = {
  id: Date.now(),
  content:
    "このメモアプリは、ReactとTailwind CSSを使って作られています。\nこのようにリプライをつけることもできます。",
  timestamp: new Date().toLocaleString("ja-JP"),
  parentId: initialMemo.id,
};

export default function App() {
  const [memos, setMemos] = useState<Memo[]>([initialMemo]);
  const [replys, setReplys] = useState<Reply[] | null>([initialReply]);
  const borderStyle: boolean = true;

  const addMemo = (inputText: string) => {
    if (inputText.trim()) {
      const memo: Memo = {
        id: Date.now(),
        content: inputText,
        timestamp: new Date().toLocaleString("ja-JP"),
      };
      setMemos([memo, ...memos]);
    }
  };

  const addReply = (inputText: string, parentId: number) => {
    if (inputText.trim()) {
      const reply: Reply = {
        id: Date.now(),
        content: inputText,
        timestamp: new Date().toLocaleString("ja-JP"),
        parentId: parentId,
      };
      const newReplys = replys ? [...replys, reply] : [reply];
      setReplys(newReplys);
    }
  };

  const deleteMemo = (id: number) => {
    if (replys) {
      const newReplys = replys.filter((reply) => reply.parentId !== id);
      setReplys(newReplys);
    }
    const newMemos = memos.filter((memo) => memo.id !== id);
    setMemos(newMemos);
  };
  const deleteReply = (id: number) => {
    const newReplys = replys?.filter((reply) => reply.id !== id);
    setReplys(newReplys ?? []);
  };

  const updateMemo = (id: number, content: string) => {
    if (content.trim()) {
      const newMemos = memos.map((memo) =>
        memo.id === id ? {...memo, content} : memo
      );
      setMemos(newMemos);
    }
  };

  const updateReply = (id: number, content: string) => {
    if (content.trim()) {
      const newReplys = replys?.map((reply) =>
        reply.id === id ? {...reply, content} : reply
      );
      setReplys(newReplys ?? []);
    }
  };

  return (
    <Layout>
      <Form
        mode="memo"
        placeholder="新しいメモを入力..."
        addMemo={addMemo}
        initialValue=""
      />
      <MemoList
        memos={memos}
        replys={replys ?? []}
        addReply={addReply}
        deleteMemo={deleteMemo}
        deleteReply={deleteReply}
        updateMemo={updateMemo}
        updateReply={updateReply}
        borderStyle={borderStyle}
      />
    </Layout>
  );
}