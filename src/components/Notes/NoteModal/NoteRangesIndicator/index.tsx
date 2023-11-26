import React, { useContext } from 'react';

import useTranslation from 'next-translate/useTranslation';

import { parseNoteRanges } from '../utils/ranges';

import styles from './NoteRangesIndicator.module.scss';

import DataContext from '@/contexts/DataContext';
import { getChapterData } from '@/utils/chapter';
import { toLocalizedVerseKey } from '@/utils/locale';

type Props = {
  ranges: string[];
};

const NoteRangesIndicator: React.FC<Props> = ({ ranges }) => {
  const { lang } = useTranslation();
  const chaptersData = useContext(DataContext);
  if (!ranges || ranges.length === 0) {
    return <></>;
  }

  // TODO: this is temporary and assumes that a note has only one range and 1 Ayah inside that range
  const [verseKey, chapterNumber] = parseNoteRanges(ranges);
  const chapterData = getChapterData(chaptersData, chapterNumber.toString());
  const verseKeyName = `${chapterData.transliteratedName} ${toLocalizedVerseKey(
    verseKey.toString(),
    lang,
  )}`;
  return <div className={styles.container}>{verseKeyName}</div>;
};

export default NoteRangesIndicator;
