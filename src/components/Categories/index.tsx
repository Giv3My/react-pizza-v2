import React from 'react';

import { categories } from './data';

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, index) => (
            <li
              key={categoryName}
              className={index === value ? 'active' : ''}
              onClick={() => onChangeCategory(index)}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
