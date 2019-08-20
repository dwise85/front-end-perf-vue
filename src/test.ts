function requireAll(r: any): any {
  r.keys().forEach(r);
}
requireAll((require as any).context("./", true, /spec.ts$/));
