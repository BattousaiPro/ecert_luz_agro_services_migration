import { Module } from "@nestjs/common";
import { ComunaModule } from "./comuna/comuna.module";

@Module({
  imports: [
    ComunaModule
  ],
})
export class ApiModule { }
