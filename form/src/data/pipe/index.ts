// src/data/pipe/index.ts
import { sgpWeights } from './sgp';
import { ss400Weights } from './ss400';
import { sus304Weights } from './sus304';
import { sus304LWeights } from './sus304L';
import { sus316Weights } from './sus316';
import { sus316LWeights } from './sus316L';
import { stpgWeights } from './stpg'; 
import type { MaterialKind } from '@/types/MaterialKind';

export const pipeWeightMap: Record<MaterialKind, any> = {
  sgp: sgpWeights,
  ss400: ss400Weights,
  stpg: stpgWeights, 
  sus304: sus304Weights,
  sus304L: sus304LWeights,
  sus316: sus316Weights,
  sus316L: sus316LWeights,
};
