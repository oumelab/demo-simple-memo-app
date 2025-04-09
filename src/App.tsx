import Form from "./components/form";
import Layout from "./components/layout";
import MemoList from "./components/memo-list";
import {Memo, Reply} from "./types";
// import {useState} from "react";
import useLocalStorageState from "use-local-storage-state";

const initialMemo: Memo = {
  id: Date.now(),
  content:
    "思いついたことを、サッとメモ。\n作業に集中するための、シンプルなメモアプリです！",
  timestamp: new Date().toLocaleString("ja-JP"),
};

const initialReply: Reply = {
  id: Date.now(),
  content:
    "このようにリプライをつけることもできます。",
  timestamp: new Date().toLocaleString("ja-JP"),
  parentId: initialMemo.id,
};

export default function App() {
  // const [memos, setMemos] = useState<Memo[]>([initialMemo]);
  const [memos, setMemos] = useLocalStorageState<Memo[]>("memos", {
    defaultValue: [initialMemo],
  });
  
  // const [replys, setReplys] = useState<Reply[]>([initialReply]);
  const [replys, setReplys] = useLocalStorageState<Reply[]>("replys", {
    defaultValue: [initialReply],
  });
  const borderStyle: boolean = true;

  const addContent = (inputText: string, parentId?: number) => {
    if (inputText.trim()) {
      if (parentId) {
        const reply: Reply = {
          id: Date.now(),
          content: inputText,
          timestamp: new Date().toLocaleString("ja-JP"),
          parentId: parentId,
        };
        const newReplys = replys ? [...replys, reply] : [reply];
        setReplys(newReplys);
      } else {
        const memo: Memo = {
          id: Date.now(),
          content: inputText,
          timestamp: new Date().toLocaleString("ja-JP"),
        };
        const newMemos = [memo, ...memos];
        setMemos(newMemos);
      }
    }
  };

  const deleteContent = (id: number, type: "memo" | "reply") => {
    if (type === "memo") {
      const newMemos = memos.filter((memo) => memo.id !== id);
      if (replys) {
        const newReplys = replys.filter((reply) => reply.parentId !== id);
        setReplys(newReplys);
      }
      setMemos(newMemos);
    } else if (type === "reply") {
      const newReplys = replys.filter((reply) => reply.id !== id);
      setReplys(newReplys);
    }
  };

  const updateContent = (
    id: number,
    content: string,
    type: "memo" | "reply"
  ) => {
    if (content.trim()) {
      if (type === "memo") {
        const newMemos = memos.map((memo) =>
          memo.id === id ? {...memo, content} : memo
        );
        setMemos(newMemos);
      } else if (type === "reply") {
        const newReplys = replys?.map((reply) =>
          reply.id === id ? {...reply, content} : reply
        );
        setReplys(newReplys ?? []);
      }
    }
  };

  return (
    <Layout>
      <Form
        mode="add"
        placeholder="新しいメモを入力..."
        addContent={addContent}
        initialValue=""
      />
      <MemoList
        memos={memos}
        replys={replys ?? []}
        addContent={addContent}
        deleteContent={deleteContent}
        updateContent={updateContent}
        borderStyle={borderStyle}
      />
    </Layout>
  );
}
