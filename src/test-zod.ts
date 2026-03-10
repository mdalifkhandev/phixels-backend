import { z } from "zod";

const schema = z.object({ applicationEmail: z.string().email().or(z.literal("")).optional() });
console.log(schema.safeParse({ applicationEmail: "" }));
console.log(schema.safeParse({ applicationEmail: "test@test.com" }));
console.log(schema.safeParse({}));
console.log(schema.safeParse({ applicationEmail: undefined }));
