import React, { useEffect, useState } from 'react';

const Filterbar = () => {
  const [filterValue, setFilterValue] = useState('today');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  useEffect(() => {
    console.log(filterValue);
  }, [filterValue]);

  return (
    <div className="flex w-[310px] justify-center items-center gap-x-3 mx-auto mt-4">
      <label
        htmlFor="today"
        className="h-[90px] min-w-[60px] flex flex-col justify-between items-center border-[1px] border-secondary rounded-lg py-2 px-1"
      >
        <p className="font-roboto break-normal text-center">de hoy</p>
        <input
          type="radio"
          name="filter"
          id="today"
          value="today"
          checked={filterValue == 'today'}
          onChange={handleChange}
          className="text-primary focus:ring-primary"
        />
      </label>
      <label
        htmlFor="week"
        className="h-[90px] min-w-[60px] flex flex-col justify-between items-center border-[1px] border-secondary rounded-lg py-2 px-1"
      >
        <p className="font-roboto break-normal text-center">de la semana</p>
        <input
          type="radio"
          name="filter"
          id="week"
          value="week"
          checked={filterValue == 'week'}
          onChange={handleChange}
          className="text-primary focus:ring-primary"
        />
      </label>
      <label
        htmlFor="month"
        className="h-[90px] min-w-[60px] flex flex-col justify-between items-center border-[1px] border-secondary rounded-lg py-2 px-1"
      >
        <p className="font-roboto break-normal text-center">del mes</p>
        <input
          type="radio"
          name="filter"
          id="month"
          value="month"
          checked={filterValue == 'month'}
          onChange={handleChange}
          className="h-4 w-4 text-primary border-[#79747E] focus:ring-primary"
        />
      </label>
      <label
        htmlFor="all"
        className="h-[90px] min-w-[60px] grow flex flex-col justify-between items-center border-[1px] border-secondary rounded-lg py-2 px-1"
      >
        <p className="font-roboto text-center text-[16px]">de todos los tiempos</p>
        <input
          type="radio"
          name="filter"
          id="all"
          value="all"
          checked={filterValue == 'all'}
          onChange={handleChange}
          className="text-primary focus:ring-primary"
        />
      </label>
    </div>
  );
};

export default Filterbar;
