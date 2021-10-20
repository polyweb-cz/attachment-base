<?php


namespace PolyWeb\AttachmentBase;


use Nette\DI\CompilerExtension;

class Extension extends CompilerExtension
{
    public const NAME = 'attachment_base';

    public function loadConfiguration()
    {
        $builder = $this->getContainerBuilder();
        $builder->addDefinition($this->prefix(self::NAME))
            ->setFactory(AttachmentBase::class)
            ->addTag('attachment')
        ;
    }
}