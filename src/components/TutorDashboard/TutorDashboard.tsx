'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import sanityClient from '@/libs/sanity';
import { v4 as uuidv4 } from 'uuid';

const courseTypes = ['Humanities', 'Engineering', 'Basic/Applied', 'All', 'Health'];

interface Course {
  _id?: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  type: string;
  mysession?: string;
  contact?: string;
  experience?: string;
  aboutme?: string;
  coverImage?: { url: string };
  images?: { url: string }[];
  slug?: { current: string };
}

const TutorDashboard = () => {
  const { data: session } = useSession();
  const [course, setCourse] = useState<Course>({
    name: '',
    description: '',
    price: 0,
    type: 'Basic/Applied',
    mysession: '',
    contact: '',
    experience: '',
    aboutme: '',
    coverImage: { url: '' },
    images: [],
    slug: { current: '' },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch course for this tutor
  const fetchCourse = async () => {
    if (!session?.user?.id) return;
    try {
      const data = await sanityClient.fetch<Course>(
        `*[_type == "course" && tutor._ref == $tutorId][0]`,
        { tutorId: session.user.id }
      );
      if (data) setCourse(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [session]);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  // Handle cover image upload
  const handleCoverUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'YOUR_CLOUDINARY_UPLOAD_PRESET'); // replace with your Cloudinary preset
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setCourse((prev) => ({ ...prev, coverImage: { url: data.secure_url } }));
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload cover image');
    }
  };

  // Handle multiple images upload
  const handleImagesUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const urls: { url: string }[] = [];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);
      formData.append('upload_preset', 'YOUR_CLOUDINARY_UPLOAD_PRESET');
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
          { method: 'POST', body: formData }
        );
        const data = await res.json();
        urls.push({ url: data.secure_url });
      } catch (err) {
        console.error(err);
        toast.error('Failed to upload one of the images');
      }
    }
    setCourse((prev) => ({ ...prev, images: [...(prev.images || []), ...urls] }));
  };

  // Handle saving course (create or update)
  const handleSave = async () => {
    if (!session?.user?.id) return;
    setSaving(true);

    // Generate slug from name automatically
    const slug = course.name.toLowerCase().replace(/\s+/g, '-') + '-' + uuidv4().slice(0, 8);

    try {
      if (course._id) {
        // Update existing course
        const updatedCourse = await sanityClient
          .patch(course._id)
          .set({ ...course, slug: { current: slug }, tutor: { _type: 'reference', _ref: session.user.id } })
          .commit();
        setCourse(updatedCourse as Course);
      } else {
        // Create new course
        const newCourse = await sanityClient.create({
          _type: 'course',
          ...course,
          slug: { current: slug },
          tutor: { _type: 'reference', _ref: session.user.id },
        });
        setCourse(newCourse as Course);
      }
      toast.success('Course saved successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save course');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Your Course Dashboard</h1>

      {/* Course Form */}
      <div className="space-y-4">
        <div>
          <label className="font-semibold">Course Name</label>
          <input
            type="text"
            name="name"
            value={course.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Price (GH₵)</label>
          <input
            type="number"
            name="price"
            value={course.price}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Course Type</label>
          <select
            name="type"
            value={course.type}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            {courseTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Mysession</label>
          <textarea
            name="mysession"
            value={course.mysession || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Contact</label>
          <input
            type="text"
            name="contact"
            value={course.contact || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Experience</label>
          <textarea
            name="experience"
            value={course.experience || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-semibold">About Me</label>
          <textarea
            name="aboutme"
            value={course.aboutme || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleCoverUpload} />
          {course.coverImage?.url && (
            <img src={course.coverImage.url} alt="Cover" className="w-48 mt-2" />
          )}
        </div>

        <div>
          <label className="font-semibold">Other Images</label>
          <input type="file" accept="image/*" multiple onChange={handleImagesUpload} />
          <div className="flex gap-2 mt-2 flex-wrap">
            {course.images?.map((img, i) => (
              <img key={i} src={img.url} alt={`Image ${i}`} className="w-24 h-24 object-cover" />
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default TutorDashboard;
