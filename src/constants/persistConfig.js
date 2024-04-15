import storage from "redux-persist/lib/storage";

export const rootPersistConfig = {
  key: "Ducat",
  storage,
};

export const persistCourseConfig = {
  key: "Ducat",
  storage,
  blacklist: ["courseView", "courseEdit"],
};

export const persistCategoryConfig = {
  key: "Ducat",
  storage,
  whitelist: [
    "courseView",
    "courseEdit",
    "categoryView",
    "categoryEdit",
    "centerView",
    "centerEdit",
    "batchView",
    "batchEdit",
    "enquiryView",
    "enquiryEdit",
  ],
};
