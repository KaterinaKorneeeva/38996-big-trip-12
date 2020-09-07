const LEFT_MOUSE_CODE = 0;
const Key = {
  ENTER: `Enter`,
  ESCAPE: `Escape`
};


export const getRandomBoolean = () => Math.random() >= 0.5;

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Функция генерации случайного элемента в массиве
export const getRandomItem = function (arr) {
  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

// проверка нажатия ENTER
export const isEnterEvent = function (evt, action) {
  if (evt.key === Key.ENTER) {
    action();
  }
};

// проверка нажатия ESCAPE
export const isEscEvent = function (evt, action) {
  if (evt.key === Key.ESCAPE) {
    action();
  }
};

// проверка нажатия левой кнопки мыши
export const isMouseDownEvent = function (evt, action) {
  if (evt.button === LEFT_MOUSE_CODE) {
    action();
  }
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

