
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

  // Fetch existing course if logged in
  useEffect(() => {
    const fetchCourse = async () => {
      if (!session?.user) return;
      try {
        const res = await axios.get<Course[]>(`/api/courses?userId=${session.user.id}`);
        if (res.data.length > 0) {
          const fetchedCourse = res.data[0];

          // Ensure coverImage has _key
          if (fetchedCourse.coverImage && !fetchedCourse.coverImage._key) {
            fetchedCourse.coverImage._key = uuidv4();
          }

          // Ensure all images have _key
          if (fetchedCourse.images) {
            const imagesWithKeys = fetchedCourse.images.map((img) => ({
              _key: img._key || uuidv4(),
              url: img.url,
            }));
            fetchedCourse.images = imagesWithKeys;
          }

          // Ensure slug exists
          if (!fetchedCourse.slug) {
            fetchedCourse.slug = { _type: "slug", current: generateSlug(fetchedCourse.name || "") };
          }

          setCourse(fetchedCourse);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourse();
  }, [session]);

  // Handle field changes
  const handleChange = <K extends keyof Course>(field: K, value: Course[K]) => {
    setCourse((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle file uploads
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

      if (field === "coverImage") handleChange("coverImage", uploadedFiles[0]);
      else handleChange("images", [...(course.images || []), ...uploadedFiles]);

      toast.success("Upload successful!");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (key: string) => {
    handleChange(
      "images",
      (course.images || []).filter((img) => img._key !== key)
    );
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
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Login to continue</h1>
        <button
          onClick={() => signIn("credentials")}
          className="px-6 py-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name!}
              width={50}
              height={50}
              className="rounded-full"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">User</div>
          )}
          <h2 className="text-xl font-bold">Welcome, {session.user?.name}</h2>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">{course._id ? "Edit Course" : "Create Course"}</h1>

      <div className="grid gap-4">
        {/* Course Name */}
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
          className="border px-3 py-2 rounded"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={course.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          className="border px-3 py-2 rounded"
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={course.price || 0}
          onChange={(e) => handleChange("price", Number(e.target.value))}
          className="border px-3 py-2 rounded"
        />

        {/* Discount */}
        <input
          type="number"
          placeholder="Discount"
          value={course.discount || 0}
          onChange={(e) => handleChange("discount", Number(e.target.value))}
          className="border px-3 py-2 rounded"
        />

        {/* Type */}
        <select
          value={course.type || "Basic/Applied"}
          onChange={(e) => handleChange("type", e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {courseTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {/* Other fields */}
        <input
          type="text"
          placeholder="My Session"
          value={course.mysession || ""}
          onChange={(e) => handleChange("mysession", e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Experience"
          value={course.experience || ""}
          onChange={(e) => handleChange("experience", e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="About Me"
          value={course.aboutme || ""}
          onChange={(e) => handleChange("aboutme", e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Contact"
          value={course.contact || ""}
          onChange={(e) => handleChange("contact", e.target.value)}
          className="border px-3 py-2 rounded"
        />

        {/* Cover Image */}
        <div>
          <p>Cover Image</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "coverImage")}
          />
          {course.coverImage?.url && (
            <Image
              src={course.coverImage.url}
              alt="Cover"
              width={192}
              height={108}
              className="mt-2 object-cover"
            />
          )}
        </div>

        {/* Additional Images */}
        <div>
          <p>Additional Images</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "images")}
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {course.images?.map((img) => (
              <div key={img._key} className="relative w-24 h-24">
                <Image
                  src={img.url}
                  alt="Uploaded"
                  width={96}
                  height={96}
                  className="object-cover"
                />
                <button
                  onClick={() => handleRemoveImage(img._key)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          {loading ? "Saving..." : course._id ? "Update Course" : "Create Course"}
        </button>
      </div>
    </div>
  );
}












































































































// "use client";

// import { useState, useEffect } from "react";
// import { useSession, signIn, signOut } from "next-auth/react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Image from "next/image";
// import { v4 as uuidv4 } from "uuid";
// import { FiUpload, FiX, FiSave, FiEdit3, FiLogOut } from "react-icons/fi"; // Using react-icons for a standard look

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
//   const [isFetching, setIsFetching] = useState(true);

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
//           }

//           // Ensure slug exists
//           if (!fetchedCourse.slug) {
//             fetchedCourse.slug = { _type: "slug", current: generateSlug(fetchedCourse.name || "") };
//           }

//           setCourse(fetchedCourse);
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load existing course data.");
//       } finally {
//         setIsFetching(false);
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

//   // Handle file uploads
//   const handleFileUpload = async (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: "coverImage" | "images"
//   ) => {
//     if (!e.target.files) return;
//     const files = Array.from(e.target.files);
//     const uploadedFiles: UploadedImage[] = [];

//     setLoading(true);
//     try {
//       for (const file of files) {
//         const formData = new FormData();
//         formData.append("file", file);

//         const res = await fetch("/api/upload", { method: "POST", body: formData });
//         if (!res.ok) throw new Error("Upload API failed");
//         const data: { url: string } = await res.json();
//         uploadedFiles.push({ url: data.url, _key: uuidv4() });
//       }

//       if (field === "coverImage") handleChange("coverImage", uploadedFiles[0]);
//       else handleChange("images", [...(course.images || []), ...uploadedFiles]);

//       toast.success("Upload successful!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Upload failed");
//     } finally {
//       setLoading(false);
//       e.target.value = ""; // Clear file input
//     }
//   };

//   const handleRemoveImage = (key: string) => {
//     handleChange(
//       "images",
//       (course.images || []).filter((img) => img._key !== key)
//     );
//     toast.success("Image removed locally. Save to apply change.");
//   };

//   const handleRemoveCoverImage = () => {
//     handleChange("coverImage", null);
//     toast.success("Cover image removed locally. Save to apply change.");
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
//         // Auto-generate slug if it doesn't exist
//         slug: course.slug?.current
//           ? course.slug
//           : { _type: "slug", current: generateSlug(course.name) },
//         aboutme: course.aboutme,
//         experience: course.experience,
//         mysession: course.mysession,
//         contact: course.contact,
//         discount: course.discount,
//         price: course.price,
//         description: course.description,
//         type: course.type,
//         coverImage: course.coverImage
//           ? { ...course.coverImage, _key: course.coverImage._key || uuidv4() }
//           : undefined,
//         images: (course.images || []).map((img) => ({ url: img.url, _key: img._key || uuidv4() })),
//       };

//       let res;
//       if (course._id) {
//         // Update
//         res = await axios.patch("/api/courses", { courseId: course._id, updates: payload });
//       } else {
//         // Create
//         res = await axios.post("/api/courses", payload);
//       }

//       setCourse(res.data);
//       toast.success(course._id ? "Course updated successfully!" : "Course created successfully!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to save course. Check console for details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!session) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//         <div className="p-10 bg-white rounded-xl shadow-lg text-center">
//           <h1 className="text-3xl font-extrabold text-blue-600 mb-4">Course Dashboard</h1>
//           <p className="text-gray-600 mb-6">Please log in to manage your course details.</p>
//           <button
//             onClick={() => signIn("credentials")}
//             className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (isFetching) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         <p className="ml-4 text-lg text-gray-600">Loading course data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-md">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             {session.user?.image ? (
//               <Image
//                 src={session.user.image}
//                 alt={session.user.name!}
//                 width={40}
//                 height={40}
//                 className="rounded-full ring-2 ring-blue-500"
//               />
//             ) : (
//               <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
//                 {session.user?.name ? session.user.name[0] : "U"}
//               </div>
//             )}
//             <h2 className="text-lg font-semibold text-gray-800">Welcome, {session.user?.name}</h2>
//           </div>
//           <button
//             onClick={() => signOut({ callbackUrl: "/" })}
//             className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition duration-300"
//           >
//             <FiLogOut />
//             Logout
//           </button>
//         </div>
//       </header>
      
//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-10">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
//           <FiEdit3 className="text-blue-600" />
//           {course._id ? "Edit Course Details" : "Create New Course"}
//         </h1>

//         <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg">
          
//           <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">Basic Information</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             {/* Course Name */}
//             <LabelledInput
//               label="Course Name (Required)"
//               type="text"
//               placeholder="e.g., Advanced React Development"
//               value={course.name || ""}
//               onChange={(e) =>
//                 setCourse((prev) => ({
//                   ...prev,
//                   name: e.target.value,
//                   slug: { _type: "slug", current: generateSlug(e.target.value) },
//                 }))
//               }
//               required
//             />

//             {/* Price */}
//             <LabelledInput
//               label="Price (USD)"
//               type="number"
//               placeholder="0"
//               value={course.price === undefined ? "" : course.price}
//               onChange={(e) => handleChange("price", Number(e.target.value))}
//               required
//             />
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             {/* Discount */}
//             <LabelledInput
//               label="Discount (%)"
//               type="number"
//               placeholder="0"
//               value={course.discount === undefined ? "" : course.discount}
//               onChange={(e) => handleChange("discount", Number(e.target.value))}
//             />

//             {/* Type */}
//             <LabelledSelect
//               label="Course Type"
//               value={course.type || "Basic/Applied"}
//               onChange={(e) => handleChange("type", e.target.value)}
//               options={courseTypes}
//             />
//           </div>

//           {/* Description */}
//           <LabelledTextarea
//             label="Course Description"
//             placeholder="Provide a detailed description of what the course covers."
//             value={course.description || ""}
//             onChange={(e) => handleChange("description", e.target.value)}
//           />

//           <h2 className="text-xl font-semibold text-gray-700 mb-6 mt-8 border-b pb-2">Instructor & Logistics</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             {/* About Me */}
//             <LabelledInput
//               label="About Me (Instructor Bio)"
//               type="text"
//               placeholder="A brief summary about yourself."
//               value={course.aboutme || ""}
//               onChange={(e) => handleChange("aboutme", e.target.value)}
//             />
//             {/* Experience */}
//             <LabelledInput
//               label="Experience Level"
//               type="text"
//               placeholder="e.g., 5+ years in Web Development"
//               value={course.experience || ""}
//               onChange={(e) => handleChange("experience", e.target.value)}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             {/* My Session */}
//             <LabelledInput
//               label="Session Details (Timing/Format)"
//               type="text"
//               placeholder="e.g., Live weekly sessions on Zoom"
//               value={course.mysession || ""}
//               onChange={(e) => handleChange("mysession", e.target.value)}
//             />
//             {/* Contact */}
//             <LabelledInput
//               label="Contact Information"
//               type="text"
//               placeholder="e.g., email@example.com or phone number"
//               value={course.contact || ""}
//               onChange={(e) => handleChange("contact", e.target.value)}
//             />
//           </div>
          
//           <h2 className="text-xl font-semibold text-gray-700 mb-6 mt-8 border-b pb-2">Media Upload</h2>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Cover Image Upload */}
//             <div className="border p-4 rounded-lg">
//               <p className="font-medium text-gray-700 mb-3">Cover Image (Required)</p>
//               <input
//                 id="cover-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleFileUpload(e, "coverImage")}
//                 className="hidden"
//               />
//               <label 
//                 htmlFor="cover-upload" 
//                 className="flex items-center justify-center p-3 border-2 border-dashed border-blue-300 text-blue-600 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition duration-300"
//               >
//                 <FiUpload className="mr-2" />
//                 Click to Upload Cover Image
//               </label>

//               {course.coverImage?.url && (
//                 <div className="mt-4 relative group w-full h-48 rounded-lg overflow-hidden shadow-md">
//                   <Image
//                     src={course.coverImage.url}
//                     alt="Cover Preview"
//                     layout="fill"
//                     objectFit="cover"
//                   />
//                   <button
//                     onClick={handleRemoveCoverImage}
//                     className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
//                     aria-label="Remove cover image"
//                   >
//                     <FiX size={16} />
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Additional Images Upload */}
//             <div className="border p-4 rounded-lg">
//               <p className="font-medium text-gray-700 mb-3">Additional Images</p>
//               <input
//                 id="images-upload"
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={(e) => handleFileUpload(e, "images")}
//                 className="hidden"
//               />
//               <label 
//                 htmlFor="images-upload" 
//                 className="flex items-center justify-center p-3 border-2 border-dashed border-gray-300 text-gray-600 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-300"
//               >
//                 <FiUpload className="mr-2" />
//                 Click to Upload More Images
//               </label>

//               <div className="flex gap-3 mt-4 flex-wrap">
//                 {course.images?.map((img) => (
//                   <div key={img._key} className="relative w-24 h-24 rounded-lg overflow-hidden shadow-sm">
//                     <Image
//                       src={img.url}
//                       alt="Uploaded"
//                       layout="fill"
//                       objectFit="cover"
//                     />
//                     <button
//                       onClick={() => handleRemoveImage(img._key)}
//                       className="absolute top-1 right-1 p-0.5 bg-red-600 hover:bg-red-700 text-white rounded-full transition duration-150"
//                       aria-label="Remove image"
//                     >
//                       <FiX size={12} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>


//           {/* Submit Button */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className={`w-full flex items-center justify-center gap-2 px-6 py-3 mt-10 font-semibold rounded-lg shadow-md transition duration-300 
//               ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
//           >
//             {loading ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                 {course._id ? "Updating..." : "Creating..."}
//               </>
//             ) : (
//               <>
//                 <FiSave />
//                 {course._id ? "Update Course" : "Create Course"}
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Helper Components for Standard UI ---

// interface LabelledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label: string;
// }

// const LabelledInput: React.FC<LabelledInputProps> = ({ label, ...props }) => (
//   <div className="flex flex-col">
//     <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700 mb-1">
//       {label}
//     </label>
//     <input
//       {...props}
//       className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
//     />
//   </div>
// );

// interface LabelledTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
//   label: string;
// }

// const LabelledTextarea: React.FC<LabelledTextareaProps> = ({ label, ...props }) => (
//   <div className="flex flex-col">
//     <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700 mb-1">
//       {label}
//     </label>
//     <textarea
//       rows={4}
//       {...props}
//       className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
//     />
//   </div>
// );

// interface LabelledSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
//   label: string;
//   options: string[];
// }

// const LabelledSelect: React.FC<LabelledSelectProps> = ({ label, options, ...props }) => (
//   <div className="flex flex-col">
//     <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700 mb-1">
//       {label}
//     </label>
//     <select
//       {...props}
//       className="border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm appearance-none bg-white pr-8"
//     >
//       {options.map((option) => (
//         <option key={option} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//   </div>
// );



































