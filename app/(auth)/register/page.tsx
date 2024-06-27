"use client";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import styles from "../auth.module.css";
import {
  clearState,
  registerUserAsync,
} from "@/app/Redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import Link from "next/link";
import { errortoast, successtoast } from "@/app/utils/alerts/alerts";
import { RootState } from "@/app/Redux/store";

type Authstate = {
  loading: boolean;
  success: boolean;
  error: any;
};
type StateValues = {
  name: string;
  email: string;
  password: string;
};
type FormValue = {
  name: string;
  email: string;
  password: string;
  file?: File;
};

export default function Register() {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const [avatar, setAvatar] = useState<File | null>(null);
  const { loading, error, success } = useSelector(
    (state: { auth: Authstate }) => state.auth
  );
  const { roles } = useAppSelector((state: RootState) => state.role);
  const [selectedRole, setSelectedRole] = useState({});
  const [value, setValue] = useState<StateValues>({
    name: "",
    email: "",
    password: "",
  });
  // const [error, setError] = useState(null);

  const InputchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedRole((prev) => {
      return {};
    });
  };

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearState());
      }
    };
  }, []);

  useEffect(() => {
    if (error) {
      if (typeof error === "string") {
        errortoast(error);
        dispatch(clearState());
      }
    }
    if (success) {
      successtoast("user register in successfully");
      push("/login");
      dispatch(clearState());
    }
  }, [error, success]);

  const SubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("email", value.email);
    formData.append("password", value.password);
    if (avatar) {
      formData.append("file", avatar);
    }

    dispatch(registerUserAsync(formData));
  };

  const imageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
    }
  };

  return (
    <>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <form className={styles.regiform} onSubmit={SubmitHandler}>
        <h3>Register Here</h3>
        <label htmlFor="name">
          Username<span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          placeholder="name"
          id="name"
          name="name"
          value={value.name}
          onChange={InputchangeHandler}
        />
        {error?.name && <span className="error">{error.name}</span>}
        <label htmlFor="email">
          Email<span className={styles.required}>*</span>
        </label>
        <input
          type="email"
          placeholder="email"
          id="email"
          name="email"
          value={value.email}
          onChange={InputchangeHandler}
        />
        {error?.email && <span className="error">{error.email}</span>}
        <label htmlFor="password">
          Password<span className={styles.required}>*</span>
        </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={value.password}
          onChange={InputchangeHandler}
        />
        {(error?.password || error?.Password) && (
          <span className="error mb-2">{error.password || error.Password}</span>
        )}
        <br />
        <label htmlFor="avatar" className={styles.image_label}>
          choose image
        </label>
        <input
          type="file"
          accept="image/*"
          className={styles.avatar}
          id="avatar"
          onChange={imageChangeHandler}
        />
        {avatar && (
          <img
            src={URL.createObjectURL(avatar)}
            alt=""
            className={styles.preview}
          />
        )}
        <button disabled={loading} className={styles.sbt_btn}>
          {loading ? "wait" : "Register"}
        </button>
        <div className={styles.alreadyhave}>
          <p>
            already have account? <Link href={"/login"}>Login</Link>
          </p>
        </div>
      </form>
    </>
  );
}
