import cls from "./styles.module.scss";

export default function CountdownTime({ minutes, seconds, completed, setResendCode }) {
  const doubleTime = (str) => (String(str).length === 1 ? `0${str}` : str);

  return (
    <p className={cls.countdown}>
      {completed ? (
        <span onClick={setResendCode}>Qayta yuborish</span>
      ) : (
        <span>
          {doubleTime(minutes)}:{doubleTime(seconds)}
        </span>
      )}
    </p>
  );
}
