export interface Route<Req = void, Resp = void> {
  execute(req: Req): Promise<Resp>
}
