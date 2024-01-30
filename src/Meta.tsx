import styles from "./styles/meta.module.css";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

interface Data{
  id: number;
  title: string;
}

const Data : Data[] = [
  {
    id: 1,
    title: "Hello",
  },
  {
    id: 2,
    title: "Wow",
  },
  {
    id: 3,
    title: "Goodbye",
  },
];

// const rightButton = () => {

// }

const Meta = () => {
  const [leftItems, setLeftItems] = useState(Data);
  const [rightItems, setRightItems] = useState<Data[]>([]);

  const [selectedItems, setSelectedItems] = useState<Data[]>([]);

  const [selectedItemsRight, setSelectedItemsRight] = useState<Data[]>([])


  console.log(selectedItems)

  console.log(selectedItemsRight)

  const checkedHandlerLeft = (e: ChangeEvent<HTMLInputElement>, item:Data) => {
    if(e.target.checked){
      setSelectedItems((prev) => [...prev, item])
    }else if(e.target.checked === false){
      setSelectedItems(selectedItems.filter((ite) => ite.id !== item.id))
    }
  }

  const checkedHandlerRight = (e: ChangeEvent<HTMLInputElement>, item:Data) => {
    if(e.target.checked){
      setSelectedItemsRight((prev) => [...prev, item])
    }else if(e.target.checked === false){
      setSelectedItemsRight(selectedItems.filter((ite) => ite.id !== item.id))
    }
  }

  const rightButton = () => {
    setRightItems([...rightItems, ...selectedItems])
    setLeftItems(leftItems.filter(item => selectedItems.every((selectedItem) => selectedItem.id !== item.id)));
    setSelectedItems([])
  }

  const leftButton = () => {
    setLeftItems([...leftItems, ...selectedItemsRight])
    setRightItems(rightItems.filter(item => selectedItemsRight.every((selectedItem) => selectedItem.id !== item.id)));
    setSelectedItemsRight([])
  }

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        {leftItems.map((item) => {
          return (
            <div key={item.id} className={styles.item}>
              <p>{item.title}</p>
              <input onChange={(e) => checkedHandlerLeft(e, item)} type="checkbox" />
            </div>
          );
        })}
      </div>
      <div className={styles.buttons}>
        <button disabled={selectedItems.length === 0 && true} onClick={rightButton}>&gt;</button>
        <button disabled={selectedItemsRight.length === 0 && true} onClick={leftButton}> &lt; </button>
      </div>
      <div className={styles.right}>
      {rightItems.map((item) => {
          return (
            <div key={item.id} className={styles.item}>
              <p>{item.title}</p>
              <input onChange={(e) => checkedHandlerRight(e, item)} type="checkbox" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Meta;
