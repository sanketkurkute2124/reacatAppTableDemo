export const sampleAccounts = Array.from({ length: 25 }, (_, i) => ({
  accountName: `Account ${i + 1}`,
  email: `account${i + 1}@mail.com`,
  phone: `98${Math.floor(10000000 + Math.random() * 89999999)}`,
  website: `https://account${i + 1}.com`,
  industry: "IT",
  status: i % 2 === 0 ? "Active" : "Inactive",
  remark: "Test data"
}));
