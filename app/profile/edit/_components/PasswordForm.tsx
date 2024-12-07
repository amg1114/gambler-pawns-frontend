import StyledInput from "@/app/ui/components/forms/StyledInput";

export default function PasswordForm({
  data,
  setData,
}: {
  data: any;
  setData: (data: any) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value && data[name] !== value) {
      setData({
        ...data,
        [name]: value,
      });
    }
  };
  return (
    <form className="space-y-sm">
      <StyledInput
        label="Current Password"
        name="currentPassword"
        type="password"
        placeholder="********"
        onInput={handleChange}
      />
      <StyledInput
        label="New Password"
        name="newPassword"
        type="password"
        placeholder="********"
        onInput={handleChange}
      />
    </form>
  );
}
