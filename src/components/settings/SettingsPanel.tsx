"use client";

import type { Settings } from "@/types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Slider,
} from "@heroui/react";
import { useSettings } from "@/context/SettingsContext";
import { useState } from "react";

export function SettingsPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { settings, update } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);

  const handleUpdate = (key: keyof Settings, value: unknown) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
    update({ [key]: value });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      size="md"
      backdrop="blur"
      classNames={{
        base: "bg-background/95 backdrop-blur-sm border border-border",
        header: "border-b border-border/50",
        footer: "border-t border-border/50",
        closeButton: "hover:bg-default-100 active:bg-default-200",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {/* HEADER */}
            <ModalHeader className="flex items-center gap-2">
              <span className="text-2xl">⚙️</span>
              <span className="text-foreground text-xl font-semibold">
                Settings
              </span>
            </ModalHeader>

            {/* BODY */}
            <ModalBody className="gap-8 py-4">
              {/* Arabic Font */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-foreground/60 uppercase tracking-wider font-semibold">
                    Arabic Font
                  </label>
                  <span className="text-xs text-foreground/40">
                    {settings.arabicFont}
                  </span>
                </div>

                <Select
                  selectedKeys={new Set([settings.arabicFont])}
                  onSelectionChange={(keys) => {
                    const value = Array.from(keys)[0] as Settings["arabicFont"];
                    handleUpdate("arabicFont", value);
                  }}
                  size="sm"
                  classNames={{
                    trigger: "bg-default-100 border-default-200 data-[hover=true]:bg-default-200",
                    value: "text-foreground",
                  }}
                >
                  <SelectItem key="Amiri">Amiri</SelectItem>
                  <SelectItem key="Scheherazade New">
                    Scheherazade New
                  </SelectItem>
                  <SelectItem key="Noto Naskh Arabic">
                    Noto Naskh Arabic
                  </SelectItem>
                  <SelectItem key="Lateef">Lateef</SelectItem>
                </Select>

                {/* Preview */}
                <div className="mt-4 p-4 rounded-xl bg-default-100/50 border border-default-200">
                  <p
                    className="text-right text-foreground/80 leading-loose transition-all duration-200"
                    style={{
                      fontFamily: settings.arabicFont,
                      fontSize: `${settings.arabicFontSize}px`,
                    }}
                  >
                    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                  </p>
                </div>
              </div>

              {/* Arabic Font Size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-foreground/60 uppercase tracking-wider font-semibold">
                    Arabic Font Size
                  </label>
                  <span className="text-sm text-primary font-medium">
                    {settings.arabicFontSize}px
                  </span>
                </div>

                <Slider
                  minValue={20}
                  maxValue={48}
                  step={1}
                  value={settings.arabicFontSize}
                  onChange={(v) => {
                    const value = Array.isArray(v) ? v[0] : v;
                    handleUpdate("arabicFontSize", value);
                  }}
                  classNames={{
                    track: "bg-default-200",
                    filler: "bg-primary",
                    thumb: "border-2 border-primary bg-background",
                  }}
                />
              </div>

              {/* English Font Size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-foreground/60 uppercase tracking-wider font-semibold">
                    English Font Size
                  </label>
                  <span className="text-sm text-primary font-medium">
                    {settings.englishFontSize}px
                  </span>
                </div>

                <Slider
                  minValue={12}
                  maxValue={24}
                  step={1}
                  value={settings.englishFontSize}
                  onChange={(v) => {
                    const value = Array.isArray(v) ? v[0] : v;
                    handleUpdate("englishFontSize", value);
                  }}
                  classNames={{
                    track: "bg-default-200",
                    filler: "bg-primary",
                    thumb: "border-2 border-primary bg-background",
                  }}
                />
              </div>
            </ModalBody>

            {/* FOOTER */}
            <ModalFooter>
              <Button
                variant="ghost"
                onPress={onClose}
                className="text-foreground/70"
              >
                Cancel
              </Button>
              <Button
                onPress={onClose}
                className="font-medium text-black"
              >
                Done
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}