import StyledInput from "@/app/ui/components/forms/StyledInput";
import StyledButton from "@/app/ui/components/typography/StyledButton";
import StyledLink from "@/app/ui/components/typography/StyledLink";
import StyledTitle from "@/app/ui/components/typography/StyledTitle";

export default function ProfileEditPage() {
    return (
        <>
            <section className="mx-auto w-full space-y-xl px-md py-xl lg:max-w-96 lg:px-none">
                <section>
                    <StyledTitle
                        extraClasses="uppercase text-center mb-lg"
                        fontFamily="bungee"
                    >
                        Account Settings
                    </StyledTitle>
                    <form className="space-y-sm">
                        <StyledInput
                            label="Nickname"
                            type="text"
                            placeholder="johndoe"
                        />
                        <StyledInput
                            label="E-mail"
                            type="text"
                            placeholder="example@mailer.com"
                        />
                        <div className="grid lg:grid-cols-2 lg:gap-md">
                            <StyledInput
                                label="Country"
                                type="text"
                                placeholder="Colombia"
                            />
                            <StyledInput
                                label="Birth Date"
                                type="date"
                                placeholder="1990-01-01"
                            />
                        </div>
                    </form>
                </section>
                <section>
                    <StyledTitle
                        extraClasses="uppercase text-center mb-lg"
                        fontFamily="bungee"
                    >
                        Change Password
                    </StyledTitle>
                    <form className="space-y-sm">
                        <StyledInput
                            label="Current Password"
                            type="password"
                            placeholder="********"
                        />
                        <StyledInput
                            label="New Password"
                            type="password"
                            placeholder="********"
                        />
                    </form>
                </section>

                <section className="flex justify-end gap-md lg:justify-center">
                    <StyledButton extraClasses="min-w-32">Save</StyledButton>
                    <StyledLink
                        extraClasses="min-w-32"
                        style="outlined"
                        href="/profile"
                    >
                        Discard
                    </StyledLink>
                </section>
            </section>
        </>
    );
}
