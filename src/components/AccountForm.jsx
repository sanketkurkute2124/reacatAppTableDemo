import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addAccount, removeAccount, updateAccount } from "../features/accountSlice";
import DatePicker from "react-datepicker";
// const [addmissionFee, setAdmissionFee] = useState("");
// const [registrationFee ,setRegistrationFee]=useState("");
export default function AccountForm() {
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accounts.list || []);
  const { register, control, handleSubmit, reset, watch, setValue, getValues, formState: { errors } } = useForm();

  const registrationFee = watch("registrationFee", "");
  const admissionFee = watch("admissionFee", "");

  React.useEffect(() => {
    const reg = parseFloat(registrationFee) || 0;
    const adm = parseFloat(admissionFee) || 0;
    const total = reg + adm;
    setValue("totalFee", total.toString(), { shouldValidate: true, shouldDirty: true });
  }, [registrationFee, admissionFee, setValue]);


//  const addmissionFee {q
//     const start = (page - 1) * PAGE_SIZE;
//     return sortedData.slice(start, start + PAGE_SIZE);
//   }, [sortedData, page]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      dob: data.dob ? new Date(data.dob).toLocaleDateString("en-GB") : ""
    };

    dispatch(addAccount(payload));
    reset();
  };

  const handleDelete = () => {
    const email = getValues("email");
    if (!email) {
      alert("Enter email in the email field to delete account.");
      return;
    }

    const exists = accounts.some((item) => item.email === email);
    if (!exists) {
      alert(`No account found for email: ${email}`);
      return;
    }

    dispatch(removeAccount(email));
    alert(`Deleted account with email: ${email}`);
    reset({ ...getValues(), email: "" });
  };

  const handleUpdate = () => {
    const email = getValues("email");
    if (!email) {
      alert("Enter email in the email field to update account.");
      return;
    }

    const exists = accounts.some((item) => item.email === email);
    if (!exists) {
      alert(`No account found for email: ${email}`);
      return;
    }

    const data = getValues();
    const payload = {
      ...data,
      dob: data.dob ? new Date(data.dob).toLocaleDateString("en-GB") : ""
    };

    dispatch(updateAccount(payload));
    alert(`Updated account with email: ${email}`);
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
            {/* Account Name <span className="text-red-500">*</span> */}
             Name <span className="text-red-500">*</span>
          </label>
          <input 
            {...register("accountName", { required: "Account Name is required" })}
            placeholder="Enter  name"
            className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.accountName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.accountName && <p className="text-red-500 text-sm mt-1">{errors.accountName.message}</p>}
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

      

        {/* Website */}
        {/* <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium">Website</label>
          <input 
            {...register("website")}
            placeholder="Enter website"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div> */}

        {/* Industry */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium">
            Dob <span className="text-red-500">*</span>
          </label>

          <Controller
            name="dob"
            control={control}
            rules={{ required: "Date of birth is required" }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
              />
            )}
          />
          {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
        </div>

        


        {/* Status */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium">Gender</label>
          <select 
            {...register("status")}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {/* <option value="Active">Active</option> */}
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        
         <div >
          <label className="mb-1 text-gray-700 font-medium">Registration fee</label>
           <input 
              {...register("registrationFee")}
            
              placeholder="Enter the Reg Fee"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              //  onChange={(e) => setRegistrationFee(e.target.value)}
              
               />
          
         </div>
           <div >
          <label className="mb-1 text-gray-700 font-medium">Addmission fee</label>
           <input 
              {...register("admissionFee")}
            
              placeholder="Enter the Admission Fee"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              // onChange={(e) => setAdmissionFee(e.target.value)}
               />
          
         </div>
        <div>
           
          <label className="mb-1 text-gray-700 font-medium">Total fee</label>
           <input 
              {...register("totalFee")}
            
              placeholder="Enter the Total Fee"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              // onChange={(e) => setAdmissionFee(e.target.value)}
               />
          
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

      <div className="mt-6 flex gap-3">
        <button 
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300"
        >
          Add Account
        </button>

        <button
          type="button"
          onClick={handleUpdate}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-md transition duration-300"
        >
          Update by Email
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition duration-300"
        >
          Delete by Email
        </button>
      </div>
    </form>
  );
}
