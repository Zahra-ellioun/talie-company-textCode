import React, { useEffect, useMemo, useState } from "react";

import { Userprops } from "../types/user";
import { getAllUsers } from "../services/userService";
import User from "./User";
import SearchInput from "./SearchInput";

const items_size = 5;

const UserList: React.FC = () => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState<Userprops[]>([]);
  const [selectUser, setSelectUser] = useState<Userprops | null>(null);

  // items to show
  const [visibleCount, setVisibleCount] = useState(items_size);

  // api request for give users data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await getAllUsers();
        if (usersRes) {
          setUsers(usersRes);
          // console.log("دریافت  همه کاربران:", usersRes);
        }
      } catch (err: any) {
        console.error("خطا در دریافت  همه کاربران:", err?.message);
      }
    };
    fetchData();
  }, []);

  // after change search input at first we can see items_size items
  useEffect(() => {
    setVisibleCount(items_size);
  }, [input]);

  // filter users after search in search box
  const filteredUsers = useMemo(() => {
    const searchText = input.trim().toLowerCase();
    if (!searchText) return users;
    return users.filter((user) => user.name.toLowerCase().includes(searchText));
  }, [input, users]);

  // count how many users we can see
  const visibleUsers = useMemo(() => {
    return filteredUsers.slice(0, visibleCount);
  }, [filteredUsers, visibleCount]);

  const loadMore = visibleCount < filteredUsers.length;

  return (
    <div>
      <SearchInput input={input} setInput={setInput} />

      <div className="bg-[#434E78]  m-4 rounded-xl text-white shadow-sm">
        <div className="space-y-1.5 p-4 mb-6 border-b border-[#607B8F] flex flex-row items-center">
          <h3 className="text-3xl font-medium flex-1 pr-2 ">کاربران</h3>
        </div>

        {selectUser && (
          <div className="mx-6 mb-4 rounded-xl border border-[#607B8F] p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-semibold">{selectUser.name}</h4>
              <button
                className="text-sm  opacity-90"
                onClick={() => setSelectUser(null)}
              >
                بستن
              </button>
            </div>

            <div className="mt-3 grid gap-2 text-sm">
              <div>
                <span className="opacity-80">Email : </span>
                <span>{selectUser.email}</span>
              </div>
              <div>
                <span className="opacity-80">Phone : </span>
                <span>{selectUser.phone}</span>
              </div>
              <div>
                <span className="opacity-80">Website : </span>
                <a
                  className="underline"
                  href={`https://${selectUser.website}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {selectUser.website}
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 pt-0">
          <div className="rounded-xl bg-[#434E78] text-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="container min-w-full divide-y divide-[#607B8F] text-center ">
                <thead className=" text-md text-white">
                  <tr>
                    <th className=" px-4 py-4">نام و نام خانوادگی</th>

                    <th className=" px-4 py-4 ">ایمیل </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#607B8F] text-sm">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="px-4 py-6 text-center">
                        کاربری پیدا نشد
                      </td>
                    </tr>
                  ) : (
                    visibleUsers.map((user: Userprops) => (
                      <User
                        key={user.id}
                        user={user}
                        onSelect={() => setSelectUser(user)}
                        isSelected={selectUser?.id === user.id}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* load more button */}
            {filteredUsers.length > 0 && (
              <div className="p-4 flex items-center justify-between border-t border-[#607B8F]">
                <div className="text-sm opacity-90">
                  نمایش {Math.min(visibleCount, filteredUsers.length)} از{" "}
                  {filteredUsers.length}
                </div>

                <button
                  disabled={!loadMore}
                  onClick={() =>
                    setVisibleCount((count) =>
                      Math.min(count + items_size, filteredUsers.length)
                    )
                  }
                  className={`px-4 py-2 rounded-lg text-sm transition
                    ${
                      loadMore
                        ? "bg-white/10 hover:bg-white/20"
                        : "bg-white/5 opacity-50 cursor-not-allowed"
                    }`}
                >
                  بارگذاری بیشتر
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
