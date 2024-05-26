import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByName, updateProfile } from "../helpers/apidata";
import { getUser } from "../helpers/usercontroller";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarAlt, setAvatarAlt] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserByName(username);
      setUser(userData.data);
      setAvatarUrl(userData.data.avatar.url);
      setAvatarAlt(userData.data.avatar.alt);
    };
    const getLoggedInUser = async () => {
      const user = await getUser();
      setLoggedInUser(user);
    };
    getLoggedInUser();
    fetchUser();

    if (loggedInUser && user && loggedInUser.id === user.id) {
      setIsOwner(true);
    }
  }, [username, user, loggedInUser]);

  const handleSave = async () => {
    await updateProfile(username, avatarUrl, avatarAlt);
    setShowModal(false);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <>
    <Helmet>
        <title>{user.name} - Holidaze</title>
        <meta
            name="description"
            content={user.bio}
        />
    </Helmet>
    <section className="bg-primary">
      <div className="flex flex-col max-w-[1600px] mx-auto p-8 py-12">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-5xl font-black mb-1">{user.name}</h1>
            <p>{user.bio}</p>
            <p className="text-sm text-sec">{user.email}</p>
          </div>
          <div className="relative group">
            <img
              src={avatarUrl}
              alt={avatarAlt}
              className="md:w-96 md:h-96 h-24 w-24 object-cover rounded-full"
            />
            {isOwner && (
              <div
                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center cursor-pointer rounded-full"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => setShowModal(true)}
              >
                <span className="text-white hidden group-hover:inline-block">Edit Photo</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 flex flex-col">
            <h2 className="mb-2 text-2xl font-black">Edit Photo</h2>
            <label htmlFor="avatarUrl" className="mb-2">Avatar URL</label>
            <input
              type="text"
              id="avatarUrl"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <label htmlFor="avatarAlt" className="mb-2">Avatar Alt</label>
            <input
              type="text"
              value={avatarAlt}
              id="avatarAlt"
              onChange={(e) => setAvatarAlt(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <button className="bg-title text-white p-4" onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </section>
    {user.venues && user.venues.length > 0 && (
        <section className="bg-primary text-sec">
        <div className="max-w-[1600px] mx-auto p-8 py-12">
            <h2 className="text-4xl font-black text-title text-center mb-4">Users Venues</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {user.venues && user.venues.map((venue) => (
                    <div key={venue.id} className="p-4">
                        <Link to={`/venues/${venue.id}`}>
                            <img src={venue.media[0].url} alt={venue.media[0].alt} className="w-full h-64 object-cover rounded" />
                        <h2 className="text-2xl font-black py-1">{venue.name}</h2>
                        <p>{venue.description}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </section>
    )}
</>
  );
};

export default Profile;
