// "use client";

// import { useState, useEffect } from "react";
// import { useSession, signIn, signOut } from "next-auth/react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Image from "next/image";
// import { v4 as uuidv4 } from "uuid";

// // Generate slug from string
// const generateSlug = (str: string) =>
//   str
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-");

// interface UploadedImage {
//   url: string;
//   _key: string;
// }

// interface Course {
//   _id?: string;
//   name: string;
//   slug?: { _type: "slug"; current: string };
//   description?: string;
//   price?: number;
//   discount?: number;
//   type?: string;
//   mysession?: string;
//   experience?: string;
//   aboutme?: string;
//   contact?: string;
//   coverImage?: UploadedImage | null;
//   images?: UploadedImage[];
// }

// const courseTypes = ["Humanities", "Engineering", "Basic/Applied", "All", "Health"];
// const MAX_IMAGES = 3;

// export default function Dashboard() {
//   const { data: session } = useSession();

//   const [course, setCourse] = useState<Course>({
//     name: "",
//     slug: { _type: "slug", current: "" },
//     description: "",
//     price: 0,
//     discount: 0,
//     type: "Basic/Applied",
//     mysession: "",
//     experience: "",
//     aboutme: "",
//     contact: "",
//     coverImage: null,
//     images: [],
//   });

//   const [loading, setLoading] = useState(false);

//   // Fetch existing course if logged in
//   useEffect(() => {
//     const fetchCourse = async () => {
//       if (!session?.user) return;
//       try {
//         const res = await axios.get<Course[]>(`/api/courses?userId=${session.user.id}`);
//         if (res.data.length > 0) {
//           const fetchedCourse = res.data[0];

//           // Ensure coverImage has _key
//           if (fetchedCourse.coverImage && !fetchedCourse.coverImage._key) {
//             fetchedCourse.coverImage._key = uuidv4();
//           }

//           // Ensure all images have _key
//           if (fetchedCourse.images) {
//             const imagesWithKeys = fetchedCourse.images.map((img) => ({
//               _key: img._key || uuidv4(),
//               url: img.url,
//             }));
//             fetchedCourse.images = imagesWithKeys;
//           } else {
//             fetchedCourse.images = [];
//           }

//           // Ensure slug exists
//           if (!fetchedCourse.slug) {
//             fetchedCourse.slug = { _type: "slug", current: generateSlug(fetchedCourse.name || "") };
//           }

//           setCourse(fetchedCourse);
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load course");
//       }
//     };
//     fetchCourse();
//   }, [session]);

//   // Handle field changes
//   const handleChange = <K extends keyof Course>(field: K, value: Course[K]) => {
//     setCourse((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // Handle file uploads - enforces MAX_IMAGES for additional images
//  const handleFileUpload = async (
//   e: React.ChangeEvent<HTMLInputElement>,
//   field: "coverImage" | "images"
// ) => {
//   if (!e.target.files) return;

//   const files = Array.from(e.target.files);
//   const uploadedFiles: UploadedImage[] = [];

//   setLoading(true);

//   try {
//     for (const file of files) {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data: { url: string } = await res.json();
//       uploadedFiles.push({ url: data.url, _key: uuidv4() });
//     }

//     if (field === "coverImage") {
//       handleChange("coverImage", uploadedFiles[0]);
//     } else {
//       handleChange("images", [
//         ...(course.images || []),
//         ...uploadedFiles,
//       ]);
//     }

//     toast.success("Upload successful!");
//   } catch (err) {
//     console.error(err);
//     toast.error("Upload failed");
//   } finally {
//     setLoading(false);

//     // SAFE reset
//     if (e.target) {
//       (e.target as HTMLInputElement).value = "";
//     }
//   }
// };

//   // helper to upload an array of files
//   // const uploadFiles = async (files: File[], field: "coverImage" | "images") => {
//   //   const uploadedFiles: UploadedImage[] = [];
//   //   setLoading(true);
//   //   try {
//   //     for (const file of files) {
//   //       const formData = new FormData();
//   //       formData.append("file", file);

//   //       const res = await fetch("/api/upload", { method: "POST", body: formData });
//   //       if (!res.ok) throw new Error("Upload failed");
//   //       const data: { url: string } = await res.json();
//   //       uploadedFiles.push({ url: data.url, _key: uuidv4() });
//   //     }

//   //     if (field === "coverImage") {
//   //       handleChange("coverImage", uploadedFiles[0]);
//   //     } else {
//   //       handleChange("images", [...(course.images || []), ...uploadedFiles]);
//   //     }

//   //     toast.success("Upload successful!");
//   //   } catch (err) {
//   //     console.error(err);
//   //     toast.error("Upload failed");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleRemoveImage = (key: string) => {
//     handleChange(
//       "images",
//       (course.images || []).filter((img) => img._key !== key)
//     );
//   };

//   const handleRemoveCover = () => {
//     handleChange("coverImage", null);
//   };

//   const handleSubmit = async () => {
//     if (!course.name || !course.price || !session?.user?.id) {
//       return toast.error("Course Name, Price, and User ID are required");
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         userId: session.user.id,
//         name: course.name,
//         slug: course.slug || { _type: "slug", current: generateSlug(course.name) },
//         aboutme: course.aboutme,
//         experience: course.experience,
//         mysession: course.mysession,
//         contact: course.contact,
//         discount: course.discount,
//         price: course.price,
//         description: course.description,
//         type: course.type,
//         coverImage: course.coverImage ? { ...course.coverImage, _key: course.coverImage._key || uuidv4() } : undefined,
//         images: (course.images || []).map((img) => ({ url: img.url, _key: img._key || uuidv4() })),
//       };

//       let res;
//       if (course._id) {
//         res = await axios.patch("/api/courses", { courseId: course._id, updates: payload });
//       } else {
//         res = await axios.post("/api/courses", payload);
//       }

//       setCourse(res.data);
//       toast.success(course._id ? "Course updated!" : "Course created!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to save course");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!session) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
//         <h1 className="text-2xl font-bold">Login to continue</h1>
//         <button
//           onClick={() => signIn("credentials")}
//           className="px-6 py-2 btn-primary"
//         >
//           Login
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-10 max-w-6xl">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div className="flex items-center gap-4">
//           {session.user?.image ? (
//             <Image
//               src={session.user.image}
//               alt={session.user.name!}
//               width={56}
//               height={56}
//               className="rounded-full object-cover"
//             />
//           ) : (
//             <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
//               User
//             </div>
//           )}
//           <div>
//             <h2 className="text-xl font-semibold">Welcome, {session.user?.name}</h2>
//             <p className="text-gray-500 text-sm">Manage your course listing</p>
//           </div>
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={() => signOut({ callbackUrl: "/" })}
//             className="px-4 py-2 rounded border border-gray-200 hover:bg-gray-50"
//             aria-label="Logout"
//           >
//             Logout
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="btn-primary px-4 py-2 rounded"
//             aria-label="Save course"
//           >
//             {loading ? "Saving..." : course._id ? "Update Course" : "Save Course"}
//           </button>
//         </div>
//       </div>

//       {/* Main Card */}
//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
//           {/* Form Column */}
//           <div className="lg:col-span-2 space-y-4">
//             <h3 className="text-lg font-medium">{course._id ? "Edit Course" : "Create New Course"}</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="Course Name"
//                 value={course.name || ""}
//                 onChange={(e) =>
//                   setCourse((prev) => ({
//                     ...prev,
//                     name: e.target.value,
//                     slug: { _type: "slug", current: generateSlug(e.target.value) },
//                   }))
//                 }
//                 className="border px-4 py-3 rounded-md w-full"
//               />

//               <select
//                 value={course.type || "Basic/Applied"}
//                 onChange={(e) => handleChange("type", e.target.value)}
//                 className="border px-4 py-3 rounded-md"
//               >
//                 {courseTypes.map((t) => (
//                   <option key={t} value={t}>
//                     {t}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <textarea
//               placeholder="Course description"
//               rows={5}
//               value={course.description || ""}
//               onChange={(e) => handleChange("description", e.target.value)}
//               className="border w-full px-4 py-3 rounded-md"
//             />

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <input
//                 type="number"
//                 placeholder="Price"
//                 value={course.price ?? 0}
//                 onChange={(e) => handleChange("price", Number(e.target.value))}
//                 className="border px-4 py-3 rounded-md"
//               />
//               <input
//                 type="number"
//                 placeholder="Discount"
//                 value={course.discount ?? 0}
//                 onChange={(e) => handleChange("discount", Number(e.target.value))}
//                 className="border px-4 py-3 rounded-md"
//               />
//               <input
//                 type="text"
//                 placeholder="My Session"
//                 value={course.mysession || ""}
//                 onChange={(e) => handleChange("mysession", e.target.value)}
//                 className="border px-4 py-3 rounded-md"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="Experience"
//                 value={course.experience || ""}
//                 onChange={(e) => handleChange("experience", e.target.value)}
//                 className="border px-4 py-3 rounded-md"
//               />
//               <input
//                 type="text"
//                 placeholder="Contact"
//                 value={course.contact || ""}
//                 onChange={(e) => handleChange("contact", e.target.value)}
//                 className="border px-4 py-3 rounded-md"
//               />
//             </div>

//             <input
//               type="text"
//               placeholder="About Me"
//               value={course.aboutme || ""}
//               onChange={(e) => handleChange("aboutme", e.target.value)}
//               className="border px-4 py-3 rounded-md w-full"
//             />
//           </div>

//           {/* Preview & Images Column */}
//           <aside className="space-y-4">
//             <div className="border rounded-md p-4">
//               <h4 className="font-medium mb-2">Cover Image</h4>
//               <div className="flex flex-col gap-3">
//                 {course.coverImage?.url ? (
//                   <div className="relative w-full h-44 rounded-md overflow-hidden bg-gray-100">
//                     <Image
//                       src={course.coverImage.url}
//                       alt="Cover preview"
//                       fill
//                       sizes="(max-width: 768px) 100vw, 300px"
//                       className="object-cover"
//                     />
//                     <button
//                       onClick={handleRemoveCover}
//                       className="absolute top-2 right-2 bg-white/90 text-red-600 rounded-full w-8 h-8 flex items-center justify-center shadow"
//                       aria-label="Remove cover"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="w-full h-44 bg-gray-50 rounded-md flex items-center justify-center text-gray-400">
//                     No cover selected
//                   </div>
//                 )}

//                 <label className="block">
//                   <span className="sr-only">Choose cover image</span>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleFileUpload(e, "coverImage")}
//                     className="text-sm"
//                   />
//                 </label>
//               </div>
//             </div>

//             <div className="border rounded-md p-4">
//               <div className="flex items-center justify-between mb-2">
//                 <h4 className="font-medium">Course Images</h4>
//                 <span className="text-sm text-gray-500">{(course.images || []).length}/{MAX_IMAGES}</span>
//               </div>

//               <p className="text-xs text-gray-500 mb-2">Upload up to {MAX_IMAGES} images. Thumbnails will show below.</p>

//               <label className="block mb-3">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={(e) => handleFileUpload(e, "images")}
//                   className="text-sm"
//                 />
//               </label>

//               <div className="grid grid-cols-3 gap-3">
//                 {(course.images || []).slice(0, MAX_IMAGES).map((img) => (
//                   <div key={img._key} className="relative w-full h-24 rounded-md overflow-hidden bg-gray-100">
//                     <Image
//                       src={img.url}
//                       alt="Course image"
//                       fill
//                       sizes="100px"
//                       className="object-cover"
//                     />
//                     <button
//                       onClick={() => handleRemoveImage(img._key)}
//                       className="absolute top-1 right-1 bg-white/90 text-red-600 rounded-full w-6 h-6 flex items-center justify-center shadow"
//                       aria-label="Remove image"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}

//                 {/* Empty slots to indicate remaining available spots */}
//                 {Array.from({ length: MAX_IMAGES - (course.images?.length || 0) }).map((_, idx) => (
//                   <div key={`slot-${idx}`} className="w-full h-24 rounded-md border border-dashed border-gray-200 flex items-center justify-center text-gray-300">
//                     <span>Empty</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="border rounded-md p-4">
//               <h4 className="font-medium mb-2">Quick Actions</h4>
//               <div className="flex flex-col gap-2">
//                 <button
//                   onClick={handleSubmit}
//                   disabled={loading}
//                   className="btn-primary py-2 rounded"
//                 >
//                   {loading ? "Saving..." : course._id ? "Update Course" : "Create Course"}
//                 </button>
//                 <button
//                   onClick={() => {
//                     setCourse({
//                       name: "",
//                       slug: { _type: "slug", current: "" },
//                       description: "",
//                       price: 0,
//                       discount: 0,
//                       type: "Basic/Applied",
//                       mysession: "",
//                       experience: "",
//                       aboutme: "",
//                       contact: "",
//                       coverImage: null,
//                       images: [],
//                     });
//                     toast.success("Form cleared");
//                   }}
//                   className="px-3 py-2 rounded border"
//                 >
//                   Clear Form
//                 </button>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

// Generate slug from string
const generateSlug = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

interface UploadedImage {
  url: string;
  _key: string;
}

interface Course {
  _id?: string;
  name: string;
  slug?: { _type: "slug"; current: string };
  description?: string;
  price?: number;
  discount?: number;
  type?: string;
  mysession?: string;
  experience?: string;
  aboutme?: string;
  contact?: string;
  coverImage?: UploadedImage | null;
  images?: UploadedImage[];
}

const courseTypes = ["Humanities", "Engineering", "Basic/Applied", "All", "Health"];
const MAX_IMAGES = 3;

export default function Dashboard() {
  const { data: session } = useSession();

  const [course, setCourse] = useState<Course>({
    name: "",
    slug: { _type: "slug", current: "" },
    description: "",
    price: 0,
    discount: 0,
    type: "Basic/Applied",
    mysession: "",
    experience: "",
    aboutme: "",
    contact: "",
    coverImage: null,
    images: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!session?.user) return;
      try {
        const res = await axios.get<Course[]>(`/api/courses?userId=${session.user.id}`);
        if (res.data.length > 0) {
          const fetchedCourse = res.data[0];
          if (fetchedCourse.coverImage && !fetchedCourse.coverImage._key) {
            fetchedCourse.coverImage._key = uuidv4();
          }
          if (fetchedCourse.images) {
            fetchedCourse.images = fetchedCourse.images.map((img) => ({
              _key: img._key || uuidv4(),
              url: img.url,
            }));
          } else {
            fetchedCourse.images = [];
          }
          if (!fetchedCourse.slug) {
            fetchedCourse.slug = { _type: "slug", current: generateSlug(fetchedCourse.name || "") };
          }
          setCourse(fetchedCourse);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load course");
      }
    };
    fetchCourse();
  }, [session]);

  const handleChange = <K extends keyof Course>(field: K, value: Course[K]) => {
    setCourse((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "coverImage" | "images"
  ) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const uploadedFiles: UploadedImage[] = [];

    setLoading(true);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data: { url: string } = await res.json();
        uploadedFiles.push({ url: data.url, _key: uuidv4() });
      }
      if (field === "coverImage") {
        handleChange("coverImage", uploadedFiles[0]);
      } else {
        handleChange("images", [...(course.images || []), ...uploadedFiles]);
      }
      toast.success("Upload successful!");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
      if (e.target) (e.target as HTMLInputElement).value = "";
    }
  };

  const handleRemoveImage = (key: string) => {
    handleChange(
      "images",
      (course.images || []).filter((img) => img._key !== key)
    );
  };

  const handleRemoveCover = () => {
    handleChange("coverImage", null);
  };

  const handleSubmit = async () => {
    if (!course.name || !course.price || !session?.user?.id) {
      return toast.error("Course Name, Price, and User ID are required");
    }
    setLoading(true);
    try {
      const payload = {
        userId: session.user.id,
        name: course.name,
        slug: course.slug || { _type: "slug", current: generateSlug(course.name) },
        aboutme: course.aboutme,
        experience: course.experience,
        mysession: course.mysession,
        contact: course.contact,
        discount: course.discount,
        price: course.price,
        description: course.description,
        type: course.type,
        coverImage: course.coverImage ? { ...course.coverImage, _key: course.coverImage._key || uuidv4() } : undefined,
        images: (course.images || []).map((img) => ({ url: img.url, _key: img._key || uuidv4() })),
      };

      let res;
      if (course._id) {
        res = await axios.patch("/api/courses", { courseId: course._id, updates: payload });
      } else {
        res = await axios.post("/api/courses", payload);
      }

      setCourse(res.data);
      toast.success(course._id ? "Course updated!" : "Course created!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save course");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
        <h1 className="text-2xl font-bold">Login to continue</h1>
        <button
          onClick={() => signIn("credentials")}
          className=" btn-primary rounded btn-primary text-white hover:bg-blue-600 transition"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name!}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
              User
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Welcome, {session.user?.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your course listing</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="  rounded btn-primary text-white transition font-medium"
          >
            {loading ? "Saving..." : course._id ? "Update Course" : "Create Course"}
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 rounded border  hover:bg-gray-100 transition font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Form Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
              {course._id ? "Edit Course" : "Create New Course"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Course Name"
                value={course.name || ""}
                onChange={(e) =>
                  setCourse((prev) => ({
                    ...prev,
                    name: e.target.value,
                    slug: { _type: "slug", current: generateSlug(e.target.value) },
                  }))
                }
                className="border px-4 py-3 rounded-md w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
                value={course.type || "Basic/Applied"}
                onChange={(e) => handleChange("type", e.target.value)}
                className="border px-4 py-3 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {courseTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <textarea
              placeholder="Course description"
              rows={5}
              value={course.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              className="border w-full px-4 py-3 rounded-md resize-none text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              Price & Discount
              <input
                type="number"
                placeholder="Price (GHS)"
                value={course.price ?? ""}
                onChange={(e) => handleChange("price", Number(e.target.value))}
                className="border px-4 py-3 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                placeholder="Discount (%)"
                value={course.discount ?? ""}
                onChange={(e) => handleChange("discount", Number(e.target.value))}
                className="border px-4 py-3 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <textarea
              placeholder="My Session"
              rows={3}
              value={course.mysession || ""}
              onChange={(e) => handleChange("mysession", e.target.value)}
              className="border px-4 py-3 rounded-md w-full resize-none text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              placeholder="Your Experience"
              rows={3}
              value={course.experience || ""}
              onChange={(e) => handleChange("experience", e.target.value)}
              className="border px-4 py-3 rounded-md w-full resize-none text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Contact e.g 0547038272"
              value={course.contact || ""}
              onChange={(e) => handleChange("contact", e.target.value)}
              className="border px-4 py-3 rounded-md w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="About Me"
              rows={3}
              value={course.aboutme || ""}
              onChange={(e) => handleChange("aboutme", e.target.value)}
              className="border px-4 py-3 rounded-md w-full resize-none text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Preview & Images Column */}
          <aside className="space-y-4">
            <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
              <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-100">Cover Image</h4>
              <div className="flex flex-col gap-3">
                {course.coverImage?.url ? (
                  <div className="relative w-full h-44 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-600">
                    <Image
                      src={course.coverImage.url}
                      alt="Cover preview"
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover"
                    />
                    <button
                      onClick={handleRemoveCover}
                      className="absolute top-2 right-2 bg-white/90 dark:bg-gray-200 text-red-600 rounded-full w-8 h-8 flex items-center justify-center shadow"
                      aria-label="Remove cover"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-44 bg-gray-50 dark:bg-gray-600 rounded-md flex items-center justify-center text-gray-400 dark:text-gray-300">
                    No cover selected
                  </div>
                )}
                <label className="block">
                  <span className="sr-only">Choose cover image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "coverImage")}
                    className="text-sm text-gray-900 dark:text-gray-100"
                  />
                </label>
              </div>
            </div>

            <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800 dark:text-gray-100">Course Images</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">{(course.images || []).length}/{MAX_IMAGES}</span>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Upload up to {MAX_IMAGES} images. Thumbnails will show below.</p>

              <label className="block mb-3">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileUpload(e, "images")}
                  className="text-sm text-gray-900 dark:text-gray-100"
                />
              </label>

              <div className="grid grid-cols-3 gap-3">
                {(course.images || []).slice(0, MAX_IMAGES).map((img) => (
                  <div key={img._key} className="relative w-full h-24 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-600">
                    <Image
                      src={img.url}
                      alt="Course image"
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(img._key)}
                      className="absolute top-1 right-1 bg-white/90 dark:bg-gray-200 text-red-600 rounded-full w-6 h-6 flex items-center justify-center shadow"
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {Array.from({ length: MAX_IMAGES - (course.images?.length || 0) }).map((_, idx) => (
                  <div key={`slot-${idx}`} className="w-full h-24 rounded-md border border-dashed border-gray-300 dark:border-gray-500 flex items-center justify-center text-gray-300 dark:text-gray-400">
                    <span>Empty</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
              <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-100">Quick Actions</h4>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn-primary   rounded text-white  transition font-medium"
                >
                  {loading ? "Saving..." : course._id ? "Update Course" : "Create Course"}
                </button>
                <button
                  onClick={() => {
                    setCourse({
                      name: "",
                      slug: { _type: "slug", current: "" },
                      description: "",
                      price: 0,
                      discount: 0,
                      type: "Basic/Applied",
                      mysession: "",
                      experience: "",
                      aboutme: "",
                      contact: "",
                      coverImage: null,
                      images: [],
                    });
                    toast.success("Form cleared");
                  }}
                  className="px-3 py-2 rounded border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 transition font-medium"
                >
                  Clear Form
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
