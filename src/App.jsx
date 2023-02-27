import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import './assets/styles/style.css';
import { Answerslist, Chats } from './components/index';
import FormDialog from './components/forms/FormDialog';
import { db } from './firebase/index';
import { collection, query, where, getDocs } from "firebase/firestore";


const App = () => {

  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState(["init"]);
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);

  const displayNextQuestion = (nextQuestionId, nextDataset) => {

    addChats({
      text: nextDataset.question,
      type: 'question'
    })

    setAnswers(nextDataset.answers);
    setCurrentId(nextQuestionId);
  }

  const selectAnswer = (selectAnswer, nextQuestionId) => {
    // const chats = chats; //state直接更新NG。このように一回変数化して取り出すこと

    switch (true) {
      case (nextQuestionId === 'init'):
        //Reactは２回レンダリングするので一度初期化する
        setTimeout(() => {
          displayNextQuestion(nextQuestionId, dataset[nextQuestionId]);
        }, 500);
        // setChats([]);
        // chats.length = 0;
        break;

      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank'
        a.click();
        break;

      case (nextQuestionId === 'contact'):
        handleClickOpen();
        break;


      default:
        addChats({
          text: selectAnswer,
          type: 'answer'
        });//chatsは配列なのでpushする

        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 1000);
        break;
    }
  }

  const addChats = (chat) => {
    setChats(prevChats => {
      return [...prevChats, chat] // 前回のstateを自動で受け取れる。prevChatsに対して、chatを追加する
    })
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = useCallback(() => {
    setOpen(false);
  },)[setOpen];

  useEffect(() => {
    (
      async () => {
        setChats([]);
        const initDataset = {};

        const q = query(collection(db, "questions"));


        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          const id = doc.id;
          const data = doc.data();
          initDataset[id] = data;
        })

        setDataset(initDataset);
        displayNextQuestion(currentId, initDataset[currentId]);

      }
    )();
  }, []);//レンダー初回に実行するので第２引数のブランク配列をいれる

  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area')
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  });//レンダーごとに実行するので第２引数省略

  return (
    <section className='c-section'>
      <div className='c-box'>
        <Chats chats={chats} />
        <Answerslist answers={answers} select={selectAnswer} />
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  );
};

export default App;