import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateEffect } from 'ahooks';

import { selectFilter } from '../../redux/slices/filter/selectors';
import { setCategoryId, setSearchValue } from '../../redux/slices/filter/slice';

import useDebounce from '../../hooks/useDebounce';

import styles from './Search.module.scss';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector(selectFilter);

  const [value, setValue] = React.useState(searchValue);

  const searchRef = useRef<HTMLInputElement>(null);

  const debouncedValue = useDebounce(value, 250);

  useUpdateEffect(() => {
    debouncedValue && dispatch(setCategoryId(0));

    dispatch(setSearchValue(debouncedValue));
  }, [debouncedValue]);

  useUpdateEffect(() => {
    setValue(searchValue);
  }, [searchValue]);

  const onChangeInput = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  };

  const onClickClear = () => {
    setValue('');
    searchRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={searchRef}
        className={styles.input}
        value={value}
        onChange={onChangeInput}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles['clear-icon']}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};
