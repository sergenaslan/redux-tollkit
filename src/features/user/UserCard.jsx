// src/features/user/UserCard.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./userThunks";
import { selectUser, selectUserLoading, selectUserError, clearUser } from "./userSlice";

export default function UserCard() {
  const [id, setId] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const handleLoad = () => {
    dispatch(fetchUser(id));
    // Eğer .unwrap() ile hata fırlatmasını isteseydik:
    // dispatch(fetchUser(id)).unwrap().then(...).catch(...)
  };

  return (
    <div>
      <div>
        <input type="number" value={id} onChange={(e) => setId(Number(e.target.value))} />
        <button onClick={handleLoad} disabled={loading === "pending"}>
          {loading === "pending" ? "Yükleniyor..." : "Kullanıcıyı Getir"}
        </button>
        <button onClick={() => dispatch(clearUser())}>Temizle</button>
      </div>

      {error && <p style={{ color: "crimson" }}>Hata: {error}</p>}
      {user && (
        <pre style={{ background: "#111", color: "#ddd", padding: 12 }}>
{JSON.stringify(user, null, 2)}
        </pre>
      )}
    </div>
  );
}
