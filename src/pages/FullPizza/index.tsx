import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { categories } from '../../components/Categories/data';

import { Pizza } from '../../redux/slices/pizza/types';

import styles from './FullPizza.module.scss';

export const FullPizza: React.FC = () => {
  const { id } = useParams();

  const [pizza, setPizza] = React.useState<Pizza | null>(null);

  React.useEffect(() => {
    fetchPizza();
  }, []);

  const fetchPizza = async () => {
    const { data } = await axios.get<Pizza>(
      `https://6294d9f663b5d108c195b10f.mockapi.io/api/items/${id}`
    );

    setPizza(data);
  };

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className={styles.container}>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
      <div className={styles.wrapper}>
        <div className={styles['pizza-img']}>
          <img src={pizza.imageUrl} />
        </div>
        <div className={styles['pizza-info']}>
          <div className={styles['pizza-title']}>
            <h2>{pizza.name}</h2>
            <p>{pizza.rating}</p>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 14.8083L15.15 17.9167L13.7833 12.0583L18.3333 8.11667L12.3417 7.60834L10 2.08334L7.65834 7.60834L1.66667 8.11667L6.21667 12.0583L4.85001 17.9167L10 14.8083Z"
                fill="#FFBF43"
              />
            </svg>
          </div>
          <h4>Категория: {categories[pizza.category]}</h4>
          <h4>Цена: от {pizza.price} ₴</h4>
        </div>
      </div>
    </div>
  );
};
