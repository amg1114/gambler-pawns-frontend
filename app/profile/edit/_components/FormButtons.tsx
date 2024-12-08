import StyledButton from "@/app/ui/components/typography/StyledButton";

export default function FormButtons({
  hasChanges,
  handleReset,
}: {
  hasChanges: boolean;
  handleReset: () => void;
}) {
  return (
    <section className="flex justify-end gap-md py-md">
      <StyledButton
        type="submit"
        extraClasses="min-w-32"
        disabled={!hasChanges}
      >
        Save
      </StyledButton>
      {hasChanges && (
        <StyledButton
          extraClasses="min-w-32"
          style="outlined"
          type="button"
          onClick={(e) => {
            handleReset();
          }}
        >
          Discard
        </StyledButton>
      )}
    </section>
  );
}
