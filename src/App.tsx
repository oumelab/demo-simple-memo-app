import Form from "./components/form";
import Layout from "./components/layout";
import {Memo} from "./types";
import {useState} from "react";

const initialMemo: Memo = {
  id: Date.now(),
  content: "思いついたことを、サッとメモ。\n作業に集中するための、シンプルなメモアプリです！",
  timestamp: new Date().toLocaleString("ja-JP"),
};

export default function App() {
  const [memos, setMemos] = useState<Memo[]>([initialMemo]);

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

  return (
    <Layout>
      <Form placeholder="新しいメモを入力..." onSubmit={addMemo} />
      {memos.map((memo) => (
        <div key={memo.id}>
          <p>{memo.content}</p>
          <p>{memo.timestamp}</p>
        </div>
      ))}
    </Layout>
  );
}
