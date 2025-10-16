// Placeholder auth service
export async function signIn(email, password) {
  return { ok: true, user: { email } };
}

export async function signUp(email, password) {
  return { ok: true, user: { email } };
}

export async function signOut() {
  return { ok: true };
}


