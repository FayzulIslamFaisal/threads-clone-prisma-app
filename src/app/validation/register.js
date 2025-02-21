import vine from "@vinejs/vine";

export const registerSchema = vine.object({
  username: vine.string().minLength(5).maxLength(50),
  name: vine.string().minLength(5).maxLength(50),
  email: vine.string().email(),
  password: vine.string().minLength(8).maxLength(32).confirmed(),
});
