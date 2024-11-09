import { adminGuard } from "@packages/auth/index";

export default async function AdminPage() {
  await adminGuard();

  return <div>AdminPage</div>;
}
