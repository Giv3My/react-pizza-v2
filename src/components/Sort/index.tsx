import React from 'react';
import { useDispatch } from 'react-redux';
import { useClickAway } from 'ahooks';

import { setSortType } from '../../redux/slices/filter/slice';
import { Sort as SortType } from '../../redux/slices/filter/types';
import { sortList } from './data';

type SortProps = {
  value: SortType;
};

export const Sort: React.FC<SortProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const activeSortName = value.name.slice(0, value.name.indexOf('('));

  useClickAway(() => {
    setIsOpen(false);
  }, sortRef);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const onSelectSortName = (obj: SortType) => {
    dispatch(setSortType(obj));
    setIsOpen(false);
  };

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={!isOpen ? 'rotated' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={togglePopup}>{activeSortName}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, index) => {
              return (
                <li
                  key={index}
                  className={obj.property === value.property ? 'active' : ''}
                  onClick={() => onSelectSortName(obj)}
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});
