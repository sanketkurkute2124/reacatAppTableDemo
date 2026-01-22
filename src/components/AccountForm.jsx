import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addAccount } from "../features/accountSlice";

export default function AccountForm() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(addAccount(data));
    reset();
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Account</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Account Name */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium">
            Account Name <span className="text-red-500">*</span>
          </label>
          <input 
            {...register("accountName", { required: "Account Name is required" })}
            placeholder="Enter account name"
            className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.accountName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.accountName && <p className="text-red-500 text-sm mt-1">{errors.accountName.message}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input 
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address"
              }
            })}
            placeholder="Enter email"
            className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium">
            Phone <span className="text-red-500">*</span>
          </label>
          <input 
            {...register("phone", { 
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone must be 10 digits"
              }
            })}
            placeholder="Enter phone"
            className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        {/* Website */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium">Website</label>
          <input 
            {...register("website")}
            placeholder="Enter website"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Industry */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium">Industry</label>
          <input 
            {...register("industry")}
            placeholder="Enter industry"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium">Status</label>
          <select 
            {...register("status")}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Remark */}
        <div className="flex flex-col col-span-2">
          <label className="mb-1 text-gray-700 font-medium">Remark</label>
          <textarea 
            {...register("remark")}
            placeholder="Enter remark"
            rows={3}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>
      </div>

      <button 
        type="submit"
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300"
      >
        Add Account
      </button>
    </form>
  );
}
